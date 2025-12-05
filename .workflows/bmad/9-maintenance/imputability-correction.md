# Imputability & Self-Correction Workflow

**Goal**: Ensure accountability for agent actions and provide a structured mechanism to correct errors.
**Trigger**: User identifies an error, or an automated check fails.
**Agents**: Scrum Master (SM), Developer

---

## 1. 📝 Action Logging (Continuous)

**Rule**: All agents must log significant state-changing actions to `ACTION_LOG.md`.

**Format**:
```markdown
- **[Timestamp]** [Agent Name]: [Action Description] (Commit: `hash` | File: `path`)
```

**Example**:
- **[2025-12-05T10:00:00Z]** Developer: Updated `server.ts` to add health check endpoint.
- **[2025-12-05T10:05:00Z]** Architect: Approved system design `docs/architecture/system-design.md`.

---

## 2. 🔄 Correction Workflow

If an error is detected (e.g., "The last feature broke the build" or "The implementation deviated from the PRD"):

### Step 1: Identification
**User**: "Agent, there is an error in the last action. Run the Correction Workflow."

### Step 2: Analysis (Agent: Scrum Master)
1.  **Read Log**: Review `ACTION_LOG.md` to identify the last actions.
2.  **Diff Analysis**: Compare the current state with the state before the error.
3.  **Root Cause**: Determine if it was a logic error, hallucination, or missing context.

### Step 3: Rollback or Fix (Agent: Developer)
**Option A: Rollback** (If the error is critical/destructive)
```bash
git revert <commit-hash>
```

**Option B: Fix Forward** (If the error is minor)
1.  Create a fix plan.
2.  Implement the fix.
3.  Verify with tests.

### Step 4: Post-Mortem
1.  **Update Log**: Record the correction in `ACTION_LOG.md`.
    ```markdown
    - **[Timestamp]** CORRECTION: Reverted commit `abc123` due to build failure.
    ```
2.  **Update Context**: If the error was due to missing context, update `.context/` files to prevent recurrence.

---

## 3. 🛡️ Automated Safety Nets

- **Pre-Commit Hooks**: Husky ensures linting and formatting pass.
- **CI Pipeline**: GitHub Actions run tests on every push.
- **TELIS Validation**: AST validation gate (as defined in `TELIS.md`) checks for syntax errors before code is written.
