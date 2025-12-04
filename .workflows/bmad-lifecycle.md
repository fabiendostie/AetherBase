# BMAD Lifecycle & Workflows

This document outlines the **4-Phase Methodology** of the BMAD framework and the associated workflows.

---

## 🔄 The 4-Phase Methodology

### Phase 1: 📊 Analysis (Optional)
**Goal**: Brainstorm, research, and explore solutions.
**Agents**: Product Manager, Analyst
**Workflows**:
- `market-research`: Analyze competitors and market trends.
- `feasibility-study`: Assess technical viability.

### Phase 2: 📝 Planning
**Goal**: Create authoritative specifications.
**Agents**: Product Manager
**Workflows**:
- `create-prd`: Generate a Product Requirements Document (PRD).
  - **Input**: Raw ideas, user interviews.
  - **Output**: `docs/planning/PRD.md`
- `create-epics-and-stories`: Break down PRD into actionable items.
  - **Output**: `docs/planning/epics.md`, `docs/planning/stories.md`

### Phase 3: 🏗️ Solutioning
**Goal**: Design architecture, UX, and technical approach.
**Agents**: Architect, UX Designer
**Workflows**:
- `create-architecture`: Define system design, stack, and patterns.
  - **Output**: `docs/architecture/system-design.md`
- `implementation-readiness`: Validate alignment of PRD, Architecture, and Stories.
  - **Output**: Readiness Report

### Phase 4: ⚡ Implementation
**Goal**: Story-driven development with continuous validation.
**Agents**: Developer, Test Architect
**Workflows**:
- `develop-story`: Implement a specific user story.
  - **Input**: User Story file
  - **Process**: Red-Green-Refactor
  - **Output**: Working code + Tests
- `code-review`: AI-driven code review against standards.

---

## 📂 Folder Structure for BMAD

To support this lifecycle, ensure your project has these directories:

```
docs/
├── analysis/          # Phase 1 outputs
├── planning/          # Phase 2 outputs (PRDs, Stories)
├── architecture/      # Phase 3 outputs (Design docs)
└── implementation/    # Phase 4 outputs (Dev records)
```

## 🚀 How to Execute a Workflow

1.  **Select the Agent**: "Act as [Role Name]" (e.g., "Act as Product Manager")
2.  **Trigger the Workflow**: "Run [Workflow Name]" (e.g., "Run create-prd")
3.  **Provide Context**: The agent will ask for necessary inputs.
4.  **Review Output**: Validate the generated documents.

---

*Refer to `.context/bmad_roles.md` for detailed agent definitions.*
