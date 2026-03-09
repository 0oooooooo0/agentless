#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, readdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CLAUDE_DIR = join(homedir(), ".claude");
const PLUGINS_DIR = join(CLAUDE_DIR, "plugins");
const TARGET = join(PLUGINS_DIR, "agentless");
const SETTINGS_PATH = join(CLAUDE_DIR, "settings.json");
const COMMANDS_DIR = join(CLAUDE_DIR, "commands");
const PLUGIN_KEY = "agentless";

function readSettings() {
  if (!existsSync(SETTINGS_PATH)) return {};
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, "utf8"));
  } catch {
    return {};
  }
}

function writeSettings(settings) {
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + "\n");
}

function registerPlugin() {
  const settings = readSettings();
  settings.enabledPlugins = settings.enabledPlugins || {};
  if (settings.enabledPlugins[PLUGIN_KEY]) {
    return false;
  }
  settings.enabledPlugins[PLUGIN_KEY] = true;
  writeSettings(settings);
  return true;
}

function unregisterPlugin() {
  const settings = readSettings();
  if (!settings.enabledPlugins || !settings.enabledPlugins[PLUGIN_KEY]) {
    return false;
  }
  delete settings.enabledPlugins[PLUGIN_KEY];
  writeSettings(settings);
  return true;
}

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
  agentless - Auto-discovery plugin for Claude Code specialist modes

  Usage:
    npx agntless            Install (or update) the plugin
    npx agntless uninstall  Remove the plugin
    npx agntless status     Check installation status
    npx agntless help       Show this message

  Specialist modes are fetched from GitHub in real-time.
  No local catalog — always up to date.
`);
}

function install() {
  console.log("\n  Installing agentless...\n");

  if (!existsSync(PLUGINS_DIR)) {
    mkdirSync(PLUGINS_DIR, { recursive: true });
  }

  const dirs = [".claude-plugin", "skills", "commands"];

  if (existsSync(TARGET)) {
    console.log("  Updating existing installation...");
    for (const dir of dirs) {
      const targetDir = join(TARGET, dir);
      if (existsSync(targetDir)) {
        rmSync(targetDir, { recursive: true, force: true });
      }
    }
  } else {
    mkdirSync(TARGET, { recursive: true });
  }

  for (const dir of dirs) {
    const src = join(ROOT, dir);
    const dest = join(TARGET, dir);
    if (existsSync(src)) {
      cpSync(src, dest, { recursive: true });
    }
  }

  console.log("  Installed to: " + TARGET);

  const commandsSrc = join(ROOT, "commands");
  if (existsSync(commandsSrc)) {
    if (!existsSync(COMMANDS_DIR)) {
      mkdirSync(COMMANDS_DIR, { recursive: true });
    }
    cpSync(commandsSrc, COMMANDS_DIR, { recursive: true });
    console.log("  Commands registered in: " + COMMANDS_DIR);
  }

  const registered = registerPlugin();
  if (registered) {
    console.log("  Registered in Claude Code settings.");
  } else {
    console.log("  Already registered in Claude Code settings.");
  }

  console.log("");
  console.log("  Ready! Try:");
  console.log("    /agents           Scan project & recommend specialist modes");
  console.log("    /agents react     Search for specific specialist modes");
  console.log("");
}

function uninstall() {
  if (!existsSync(TARGET)) {
    console.log("\n  agentless is not installed.\n");
    return;
  }

  // Read from installed TARGET, not ROOT (ROOT may be a temp npx cache)
  const installedCommands = join(TARGET, "commands");
  if (existsSync(installedCommands)) {
    for (const file of readdirSync(installedCommands)) {
      const cmdPath = join(COMMANDS_DIR, file);
      if (existsSync(cmdPath)) {
        rmSync(cmdPath);
      }
    }
  }

  rmSync(TARGET, { recursive: true, force: true });
  unregisterPlugin();
  console.log("\n  agentless has been removed.\n");
}

function status() {
  if (!existsSync(TARGET)) {
    console.log("\n  Status: not installed\n");
    return;
  }

  const dirs = [".claude-plugin", "skills", "commands"];
  const present = dirs.filter((d) => existsSync(join(TARGET, d)));

  const settings = readSettings();
  const isRegistered = !!(settings.enabledPlugins && settings.enabledPlugins[PLUGIN_KEY]);

  console.log("\n  Status: installed");
  console.log("  Location: " + TARGET);
  console.log("  Components: " + present.join(", "));
  console.log("  Registered: " + (isRegistered ? "yes" : "no"));
  console.log("  Source: github.com/msitarzewski/agency-agents (fetched live)");
  console.log("");
}

switch (command) {
  case "uninstall":
  case "remove":
    uninstall();
    break;
  case "status":
    status();
    break;
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  default:
    install();
    break;
}
