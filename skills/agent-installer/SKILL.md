# Skill: agent-installer

Install specialist modes from GitHub.

user-invocable: false
description: Handles specialist mode installation by downloading from the agency-agents GitHub repository. Always confirms with user before installing.
allowed-tools: [Read, Write, Bash, WebFetch, Glob, AskUserQuestion]

## Instructions

When called with an agent to install, follow this flow.

### Pre-installation Checks

1. **Conflict detection**: Check if an agent with the same name already exists:
   ```
   Glob: .claude/agents/{agent-id}.md
   Glob: ~/.claude/agents/{agent-id}.md
   ```
2. If already installed, inform the user and ask if they want to update/overwrite.
3. **Always confirm** with the user before proceeding with installation.

### Installation

#### From agency-agents repository (primary)

1. Download the agent file from GitHub:
   ```
   WebFetch: https://raw.githubusercontent.com/msitarzewski/agency-agents/main/{path}
   ```
   Where `{path}` is the full path (e.g., `engineering/engineering-frontend-developer.md`)

2. Determine install location:
   - **Project local** (default): `.claude/agents/{agent-id}.md`
   - **Global** (if user requests): `~/.claude/agents/{agent-id}.md`
   - Ask the user which location they prefer.

3. Create the directory if needed:
   ```bash
   mkdir -p .claude/agents
   ```

4. Write the downloaded content:
   ```
   Write: .claude/agents/{agent-id}.md
   ```

5. Add include reference to CLAUDE.md:
   - Read existing CLAUDE.md (or create if absent)
   - Add `@agents/{agent-id}.md` as an include line if not already present
   - This ensures Claude Code loads the specialist mode automatically

#### From other GitHub source

1. Confirm with the user.
2. Download via WebFetch from the raw GitHub URL.
3. Save to `.claude/agents/{agent-id}.md`
4. Add include reference to CLAUDE.md.

### Post-installation Verification

After installation, verify:
1. The .md file exists at the expected path
2. The file is valid (non-empty, contains expected content)
3. The CLAUDE.md include reference exists
4. Report success or failure to the user

### Output

Provide a clear summary:
- What was installed and its specialty
- Where it was installed (project local or global)
- The include reference added to CLAUDE.md

### Language Rules
- NEVER use "에이전트", "agent", "persona" when talking to the user
- Use "전문가 모드", "전문 지원", "specialist mode" instead
