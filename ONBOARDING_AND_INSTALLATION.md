# 🚀 Onboarding & Installation Guide
**Version:** 1.0.0
**Date:** 2025-12-05T00:50:00-05:00
**Status:** Verified

Welcome to **AetherBase**, a universal project template powered by the **BMad Method** (Process Layer) and **TELIS** (Knowledge Layer). This guide will take you from "Zero" to "Hero," setting up your entire development environment for AI-augmented coding.

---

## 📋 Prerequisites

Before you begin, ensure you have the following tools installed. We recommend the latest stable versions as of December 2025.

### 1. Core Runtime & Languages
| Tool | Version | Download Link | Purpose |
|------|---------|---------------|---------|
| **Node.js** | v24.11.0+ (LTS) | [Download Node.js](https://nodejs.org/en/download/) | JavaScript runtime for tooling and agents. |
| **Python** | v3.14.0+ | [Download Python](https://www.python.org/downloads/) | Required for advanced data processing and AI scripts. |
| **Git** | v2.52.0+ | [Download Git](https://git-scm.com/downloads) | Version control system. |

### 2. Development Environment (IDE)
Choose **one** of the following AI-native IDEs for the best experience:

- **Cursor** (Recommended): [Download Cursor](https://cursor.sh/)
- **Windsurf**: [Download Windsurf](https://codeium.com/windsurf)
- **VS Code** + AI Extensions: [Download VS Code](https://code.visualstudio.com/)

---

## 🛠️ Step-by-Step Installation

### Phase 1: Project Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/fabiendostie/AetherBase my-new-project
    cd my-new-project
    ```

2.  **Install Dependencies**
    We use `npm` for managing project tools and `husky` for git hooks.
    ```bash
    # Install project dependencies
    npm install
    
    # Verify TypeScript installation
    npm list typescript
    # Expected: typescript@5.9.3 or higher
    ```

3.  **Initialize Git Hooks**
    This ensures code quality checks run before you commit.
    ```bash
    npx husky init
    # Verify Husky version
    npx husky --version
    # Expected: 9.1.7 or higher
    ```

### Phase 2: BMAD Method Setup (Process Layer)

The **BMad Method** provides the specialized AI agents and workflows.

1.  **Initialize Agents**
    The agent definitions are located in `.agents/`. Configure your AI assistant (Cursor, Windsurf, etc.) to read from this directory.
    - **Cursor**: Add `.agents/` to your "Rules for AI" or explicitly reference them (e.g., `@.agents/architect.agent.yaml`).
    - **Generic**: You can copy the content of an agent file (e.g., `.agents/pm.agent.yaml`) into your chat context to "summon" that agent.

2.  **Verify Workflows**
    Check that the workflow library is present:
    ```bash
    ls .workflows/bmad
    # Should list directories: 1-analysis, 2-planning, 3-solutioning, etc.
    ```

### Phase 3: TELIS Setup (Knowledge Layer)

**TELIS** (Token-Efficient Language Intelligence System) optimizes how the AI understands your code.

1.  **Language Server Protocol (LSP)**
    Ensure your IDE has the relevant extensions installed:
    - **JavaScript/TypeScript**: Built-in for VS Code/Cursor.
    - **Python**: Install "Python" extension by Microsoft.

2.  **Knowledge Shards**
    (Optional) If you are working with specialized libraries, generate knowledge shards:
    ```bash
    # Generate shards for current project
    node scripts/telis/generate-shards.js
    ```

---

## 🚦 Getting Started

### Your First Workflow: "Quick Flow"

Let's test the system by running a simple "Quick Flow" to add a feature.

1.  **Summon the Agent**:
    > "Act as **Barry** (Quick Flow Solo Dev). I want to start a new task."

2.  **Define the Task**:
    > "I need to create a simple 'Hello World' API endpoint."

3.  **Follow the Steps**:
    - Barry will look for `.workflows/bmad/quick-flow/quick-flow.md`.
    - He will guide you through **Spec**, **Plan**, and **Implementation**.

### Imputability & Self-Correction

We value accountability. Every major action is logged.

- **Log File**: `ACTION_LOG.md` (Created automatically by agents)
- **Correction**: If an agent makes a mistake, run the **Correction Workflow**:
    > "Run the Imputability Correction workflow to fix the last commit."

---

## 📚 Reference Links

- **BMAD Methodology**: [GitHub Repository](https://github.com/bmad-code-org/BMAD-METHOD)
- **TELIS Whitepaper**: [TELIS.md](./TELIS.md)
- **Project Structure**: [STRUCTURE_GUIDE.md](./STRUCTURE_GUIDE.md)

---

> [!TIP]
> **Pro Tip**: Always start your day by checking `task.md` to see where you left off!

**Happy Coding!** 🚀
