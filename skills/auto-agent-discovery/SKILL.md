# Skill: auto-agent-discovery

Automatically recommend relevant specialist modes when the user works with specific frameworks or tools.

user-invocable: false
description: When the user is working with a specific framework, language, or tool and no specialist mode is installed for it, this skill activates to suggest relevant expert modes. Fetches available modes from GitHub in real-time.
allowed-tools: [Read, Glob, Grep, Skill, WebFetch, WebSearch]

## Instructions

### Activation

This skill activates when the user's request involves a specific technology, framework, or role pattern. Examples:
- Building a React application → frontend-developer
- Setting up CI/CD pipelines → devops-automator
- Writing API tests → api-tester
- Designing a UI → ui-designer
- Mobile app development → mobile-app-builder

### Step 1: Detect Technology Context

From the user's message, identify:
- Programming languages (Python, TypeScript, Rust, Go, etc.)
- Frameworks (React, Next.js, Django, FastAPI, etc.)
- Tools (Docker, Kubernetes, Terraform, Ansible, etc.)
- Platforms (AWS, GCP, Azure, Vercel, etc.)
- Roles/tasks (security audit, UX research, performance testing, etc.)

### Step 2: Check Installed Agents

Search for already-installed specialist modes matching the detected context:
```
Glob: .claude/agents/*.md
Glob: ~/.claude/agents/*.md
Grep: search for the technology name in matched files
```

If a relevant specialist mode is already installed, do NOT recommend anything — let the existing mode handle the task.

### Step 3: Search GitHub Repository

Fetch the agency-agents repository to find matching specialist modes:
```
WebFetch: https://raw.githubusercontent.com/msitarzewski/agency-agents/main/README.md
```

Match the detected technology against agent names, descriptions, and divisions from the README.

**Known mappings** (use these for fast matching before fetching):
- React, Vue, Angular, Svelte, CSS, Tailwind → `engineering/engineering-frontend-developer.md`
- Express, Django, FastAPI, Go, Node.js → `engineering/engineering-backend-architect.md`
- React Native, Flutter, Swift, Kotlin → `engineering/engineering-mobile-app-builder.md`
- TensorFlow, PyTorch, LangChain, OpenAI → `engineering/engineering-ai-engineer.md`
- Docker, Kubernetes, Terraform, CI/CD → `engineering/engineering-devops-automator.md`
- Small/new project, MVP → `engineering/engineering-rapid-prototyper.md`
- Security, OWASP, auth → `engineering/engineering-security-engineer.md`
- UI design, design system → `design/design-ui-designer.md`
- Testing, QA, Jest, Pytest → `testing/testing-evidence-collector.md`
- API testing → `testing/testing-api-tester.md`
- Accessibility, WCAG → `testing/testing-accessibility-auditor.md`
- Performance, load testing → `testing/testing-performance-benchmarker.md`

If no known mapping matches, fetch the README and search for keyword matches in agent names and descriptions.

### Step 4: Natural Language Recommendation

**CRITICAL UX RULES:**
- NEVER use the words "에이전트", "agent", "persona" when talking to the user
- Instead use: "전문가 모드", "전문 지원", "specialist mode", "expert support"
- Frame recommendations naturally, as if suggesting expertise

Example recommendation format:

> 참고로, **Frontend 전문가 모드**를 사용할 수 있습니다. React, Vue, Angular 등 프론트엔드 개발에 특화된 전문 지원을 받을 수 있어요.
> 설치하시겠습니까?

Or in English:

> By the way, I found a **Frontend specialist mode** that can help with React, Vue, Angular development — including component architecture, performance optimization, and accessibility.
> Would you like me to set it up?

### Step 5: Handle User Response

- If the user accepts: invoke the `agent-installer` skill with the selected agent info
- If the user declines: proceed with the task using general knowledge, do not ask again in this session
- If the user ignores: proceed normally, do not repeat the suggestion

### Constraints

- Maximum 1 recommendation per conversation turn
- Do not recommend if the user is doing something trivial (e.g., a simple file edit)
- Do not recommend for technologies the user clearly already knows well
- Maximum 3 specialist modes per project recommended (to avoid context overload)
