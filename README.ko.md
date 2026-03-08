<p align="center">
  <img src="assets/logo.png" alt="agentless" width="600">
</p>

<p align="center">Claude Code 전문가 모드 자동 추천 플러그인 — 프로젝트를 분석해서 필요한 AI 전문가 페르소나를 자동으로 추천하고 설치합니다.

[agency-agents](https://github.com/msitarzewski/agency-agents) 기반 (9개 부문, 60개 이상의 전문가 모드).

## 이게 뭔가요?

**agentless**는 프로젝트의 기술 스택을 분석하고, 관련성 높은 전문가 모드(특정 분야의 깊은 전문성을 가진 AI 페르소나)를 자동으로 추천합니다. "적재적소의 전문가"를 찾아주는 도구입니다.

- **스킬** = Claude에게 *어떻게 할지* 알려주는 절차적 지시
- **전문가 모드** = Claude에게 *누구로 행동할지* 알려주는 전문성 정의

## 설치

```bash
npx agentless
```

`~/.claude/plugins/agentless/`에 플러그인을 설치하고 Claude Code에 등록합니다.

## 사용법

### `/agents` — 자동 추천 또는 검색

인자 없이 실행하면 프로젝트를 스캔해서 추천합니다:

```
/agents
```

키워드와 함께 실행하면 해당 분야를 검색합니다:

```
/agents react
/agents security
/agents devops
```

출력 예시:
```
감지된 기술: React 19, Next.js, Tailwind CSS, Jest
추천 전문가 모드:
  1. Frontend Developer (engineering) — 점수: 9
  2. Evidence Collector (testing) — 점수: 4
  3. UI Designer (design) — 점수: 3
```

### 기타 명령어

```bash
npx agentless status     # 설치 상태 확인
npx agentless uninstall  # 플러그인 제거
```

## 작동 방식

1. **프로젝트 스캔** — `package.json`, `go.mod`, `pyproject.toml` 등을 읽어 기술 프로필 생성
2. **실시간 GitHub 연동** — [agency-agents](https://github.com/msitarzewski/agency-agents)에서 매번 최신 데이터를 가져옴 — 항상 최신 상태
3. **스마트 매칭** — 기술 스택 매칭(+3점), 언어 매칭(+2점), 키워드 매칭(+1점)
4. **원클릭 설치** — 전문가 페르소나를 다운로드하고 프로젝트에 추가

## 전문가 모드 설치 위치

- **프로젝트 로컬** (기본): `.claude/agents/<agent-name>.md`
- **글로벌**: `~/.claude/agents/<agent-name>.md`
- 설치 시 `CLAUDE.md`에 `@agents/<agent-name>.md` include 자동 추가

## 뭘 검색할 수 있나요?

### 코드 기반 (자동 감지)

`/agents`를 인자 없이 실행하면 프로젝트 파일을 스캔해서 자동 추천합니다:

| 프로젝트에 있는 것 | 추천 전문가 모드 |
|---|---|
| React, Vue, Angular, Svelte, Next.js | Frontend Developer |
| Express, Django, FastAPI, Go, Node.js | Backend Architect |
| React Native, Flutter, Swift, Kotlin | Mobile App Builder |
| TensorFlow, PyTorch, LangChain | AI Engineer |
| Docker, Kubernetes, Terraform | DevOps Automator |
| Jest, Pytest, Playwright | Evidence Collector |
| OWASP, OAuth, 인증 라이브러리 | Security Engineer |
| 작은/새 프로젝트 | Rapid Prototyper |
| Laravel, PHP, Livewire | Senior Developer |
| CSS 프레임워크, 디자인 토큰 | UI Designer |
| WCAG, ARIA, 접근성 설정 | Accessibility Auditor |

### 역할 기반 (키워드 검색)

코드 파일과 무관한 역할/작업은 키워드로 검색합니다:

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

### 전체 9개 부문

| 부문 | 수 | 분야 |
|------|---|------|
| Engineering | 8 | 프론트엔드, 백엔드, 모바일, AI/ML, DevOps, 보안 |
| Design | 7 | UI, UX, 브랜드, 비주얼, 애니메이션 |
| Marketing | 11 | 소셜 미디어, 콘텐츠, 그로스, ASO |
| Product | 3 | 스프린트 계획, 트렌드, 피드백 |
| Project Management | 5 | 프로덕션, 운영, 실험 |
| Testing | 8 | QA, API, 성능, 접근성 |
| Support | 6 | 고객 지원, 분석, 재무, 법무 |
| Spatial Computing | 6 | XR, visionOS, Metal, WebXR |
| Specialized | 7 | 오케스트레이션, 데이터, LSP, 리포트 |

## 라이선스

MIT
