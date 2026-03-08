<p align="center">
  <img src="assets/logo.png" alt="agentless" width="600">
</p>

<p align="center">Auto-discovery plugin for Claude Code specialist modes — automatically recommends and installs AI expert personas based on your project's needs.

Powered by [agency-agents](https://github.com/msitarzewski/agency-agents) (60+ specialist modes across 9 divisions).

## What is this?

**agentless** analyzes your project's tech stack and automatically recommends relevant specialist modes (AI personas with deep domain expertise). Think of it as "the right expert for the job" — without you needing to know what's available.

- **Skills** tell Claude *how to do things* (procedures)
- **Specialist modes** tell Claude *who to be* (personas with domain expertise)

## Install

```bash
npx agentless
```

This installs the plugin to `~/.claude/plugins/agentless/` and registers it with Claude Code.

## Usage

### `/agents` — Auto-recommend or search

Without arguments, scans your project and recommends specialist modes:

```
/agents
```

With a keyword, searches for specific specialist modes:

```
/agents react
/agents security
/agents devops
```

Example output:
```
Detected: React 19, Next.js, Tailwind CSS, Jest
Recommended:
  1. Frontend Developer (engineering) — Score: 9
  2. Evidence Collector (testing) — Score: 4
  3. UI Designer (design) — Score: 3
```

### Other commands

```bash
npx agentless status     # Check installation status
npx agentless uninstall  # Remove the plugin
```

## How it works

1. **Project scanning** — Reads `package.json`, `go.mod`, `pyproject.toml`, etc. to build a tech profile
2. **Live GitHub fetch** — Fetches the latest agents from [agency-agents](https://github.com/msitarzewski/agency-agents) every time — always up to date
3. **Smart matching** — Scores agents by tech stack match (+3), language match (+2), keyword match (+1)
4. **One-click install** — Downloads the agent persona and adds it to your project

## Agent install locations

- **Project local** (default): `.claude/agents/<agent-name>.md`
- **Global**: `~/.claude/agents/<agent-name>.md`
- Automatically adds `@agents/<agent-name>.md` include to `CLAUDE.md`

## What can you search for?

### Code-related (auto-detected by `/agents`)

These are automatically recommended when you run `/agents` with no arguments — the plugin scans your project files and matches:

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
| Laravel, PHP, Livewire | Senior Developer |
| CSS frameworks, design tokens | UI Designer |
| WCAG, ARIA, accessibility configs | Accessibility Auditor |

### Role-related (search with `/agents <keyword>`)

These aren't tied to code files — search by role or task:

```
/agents marketing        → Content Creator, Growth Hacker, Social Media Strategist, ...
/agents product          → Sprint Prioritizer, Trend Researcher, Feedback Synthesizer
/agents project          → Senior PM, Studio Producer, Project Shepherd, ...
/agents data             → Data Analytics Reporter, Data Consolidation Agent
/agents legal            → Legal Compliance Checker
/agents finance          → Finance Tracker
/agents support          → Support Responder, Executive Summary Generator
/agents vr               → XR Immersive Developer, visionOS Spatial Engineer, ...
/agents brand            → Brand Guardian, Visual Storyteller
/agents ux               → UX Architect, UX Researcher
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

## License

MIT
