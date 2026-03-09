<div align="center">

<img src="./assets/logo.png" alt="agentless" width="600" />

**You don't need to know what agents are.**

A Claude Code plugin that automatically discovers and recommends specialist modes — AI expert personas tailored to your project.

[한국어](./README.ko.md) · [Getting Started](#getting-started) · [How It Works](#how-it-works)

</div>

---

## The Problem

There are **60+ AI agent personas** available in [agency-agents](https://github.com/msitarzewski/agency-agents) — covering frontend, backend, DevOps, testing, design, marketing, and more. But there's a catch: you have to *know* they exist to use them.

Most users never find the right persona because nobody told them it was there.

## The Solution

**agentless** removes the knowledge barrier entirely.

- **Project scanning** — `/agents` analyzes your tech stack and recommends the right specialist modes automatically.
- **Keyword search** — `/agents react` or `/agents marketing` searches across all 60+ modes.
- **Automatic recommendations** — Working with Docker? A DevOps specialist mode gets suggested. No commands needed.
- **Zero jargon** — The plugin never says "agent" or "persona" to users. It talks about "specialist modes" and "expert support" instead.

## Getting Started

### Installation

One command:

```bash
npx agntless
```

That's it. The plugin is installed to `~/.claude/plugins/agentless`.

<details>
<summary>Alternative: manual installation</summary>

```bash
git clone https://github.com/0oooooooo0/agentless.git
cd agentless && node bin/cli.mjs
```

</details>

### Usage

#### `/agents` — Scan and recommend

The main command. Without arguments, it scans your project and recommends specialist modes:

```
/agents
```

What happens:
1. Scans `package.json`, `go.mod`, `pyproject.toml`, and other project files
2. Detects your tech stack (React, TypeScript, Docker, etc.)
3. Fetches the latest agents from GitHub
4. Scores and ranks the best matches
5. Shows recommendations and lets you pick what to install

```
Detected: React 19, Next.js, Tailwind CSS, Jest

Recommended:
| # | Name                | Division    | Score | Description                    |
|---|---------------------|-------------|-------|--------------------------------|
| 1 | Frontend Developer  | engineering | 9     | React, Vue, Angular specialist |
| 2 | Evidence Collector  | testing     | 4     | Screenshot-based QA testing    |
| 3 | UI Designer         | design      | 3     | Design systems & components    |

Select to install (1,2,3 / skip):
```

#### `/agents <keyword>` — Search by role or technology

```
/agents react
/agents marketing
/agents devops
/agents ux
```

This searches the [agency-agents](https://github.com/msitarzewski/agency-agents) repository in real-time and shows matching results.

#### Just work normally

You don't have to do anything special. When you're working with a specific framework or tool, **agentless** will suggest relevant specialist modes naturally:

> By the way, I found a **Frontend specialist mode** that can help with React component architecture, performance optimization, and accessibility.
> Would you like me to set it up?

## How It Works

**agentless** fetches agents from GitHub in real-time — no local catalog, always up to date:

```
┌───────────────────────────────────────────┐
│             /agents [query]               │
│           or auto-discovery               │
└───────────────────┬───────────────────────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
  ┌─────────┐ ┌──────────┐ ┌────────┐
  │  Local   │ │  agency  │ │ GitHub │
  │ .claude/ │ │ -agents  │ │ Search │
  │ agents/  │ │  (Live)  │ │(fallback)│
  └─────────┘ └──────────┘ └────────┘
       │            │            │
       └────────────┴────────────┘
                    │
                    ▼
             Unified Results
                    │
                    ▼
             agent-installer
        (confirm → install → verify)
```

1. **Local** — Checks `.claude/agents/*.md` and `~/.claude/agents/*.md` for already-installed modes
2. **[agency-agents](https://github.com/msitarzewski/agency-agents)** — Fetches the latest agent roster from GitHub (60+ agents, 9 divisions)
3. **GitHub search** — Falls back to web search when other sources return few results

### Installation flow

| Source | How it installs |
|--------|----------------|
| Already installed | Tells you it's ready to use |
| agency-agents | Downloads `.md` from GitHub raw URL |
| Other GitHub | Downloads the raw file directly |

Every installation requires **explicit user confirmation**. Nothing gets installed silently.

Installed agents are saved to `.claude/agents/` and included in `CLAUDE.md` via `@agents/<name>.md`.

## What can you find?

### Auto-detected (by project scan)

| Your project has... | Recommended mode |
|---|---|
| React, Vue, Angular, Svelte, Next.js | Frontend Developer |
| Express, Django, FastAPI, Go, Node.js | Backend Architect |
| React Native, Flutter, Swift, Kotlin | Mobile App Builder |
| TensorFlow, PyTorch, LangChain | AI Engineer |
| Docker, Kubernetes, Terraform | DevOps Automator |
| Jest, Pytest, Playwright | Evidence Collector |
| OWASP, OAuth, auth libraries | Security Engineer |
| Small/new project, few files | Rapid Prototyper |
| CSS frameworks, design tokens | UI Designer |

### Searchable by keyword

```
/agents marketing    → Content Creator, Growth Hacker, Social Media Strategist, ...
/agents product      → Sprint Prioritizer, Trend Researcher, Feedback Synthesizer
/agents project      → Senior PM, Studio Producer, Project Shepherd, ...
/agents data         → Data Analytics Reporter, Data Consolidation Agent
/agents legal        → Legal Compliance Checker
/agents finance      → Finance Tracker
/agents support      → Support Responder, Executive Summary Generator
/agents vr           → XR Immersive Developer, visionOS Spatial Engineer, ...
/agents brand        → Brand Guardian, Visual Storyteller
/agents ux           → UX Architect, UX Researcher
```

### All 9 divisions

| Division | Count | Focus |
|----------|-------|-------|
| Engineering | 8 | Frontend, Backend, Mobile, AI/ML, DevOps, Security |
| Design | 7 | UI, UX, Brand, Visual, Animations |
| Marketing | 11 | Social media, Content, Growth, ASO |
| Product | 3 | Sprint planning, Trends, Feedback |
| Project Management | 5 | Production, Operations, Experiments |
| Testing | 8 | QA, API, Performance, Accessibility |
| Support | 6 | Customer support, Analytics, Finance, Legal |
| Spatial Computing | 6 | XR, visionOS, Metal, WebXR |
| Specialized | 7 | Orchestration, Data, LSP, Reports |

## Project Structure

```
agentless/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── bin/
│   └── cli.mjs                  # npx agntless CLI
├── skills/
│   ├── auto-agent-discovery/
│   │   └── SKILL.md             # Background auto-recommendation
│   └── agent-installer/
│       └── SKILL.md             # Installation handler
└── commands/
    └── agents.md                # /agents — scan + search + install
```

## Contributing

Issues and PRs welcome at [github.com/0oooooooo0/agentless](https://github.com/0oooooooo0/agentless).

## License

MIT

---

<div align="center">

Built by [@0oooooooo0](https://github.com/0oooooooo0)

*The best expert is the one you don't have to look for.*

</div>
