---


### 2. Follow the Onboarding Guide
Open `ONBOARDING_AND_INSTALLATION.md` and follow the step-by-step instructions to set up your environment, install dependencies, and configure the AI agents.


---

## 📁 Project Structure

```
project/
├── .context/               # Context Engineering Documents (TELIS)
│   ├── instructions.md     # AI system role and task guidance
│   ├── knowledge.md        # Domain-specific information (tiered)
│   ├── tools.md            # LSP integration & API specifications
│   ├── summary.md          # Project summaries & decision logs
│   └── rules.md            # Project-specific rules & constraints
│
├── .template/              # Reusable Templates
│   ├── project.config.json # Project metadata configuration
│   └── [additional templates]
│
├── .workflows/             # Automation Workflows
│   └── [workflow files]
│
├── docs/                   # Project Documentation
│   ├── architecture/       # Architecture documentation
│   ├── api/                # API documentation
│   └── guides/             # User and developer guides
│
├── src/                    # Source Code
│   ├── core/               # Core business logic
│   ├── utils/              # Utility functions
│   └── [modules]/          # Feature modules
│
├── tests/                  # Test Files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
│
├── config/                 # Configuration Files
│   ├── development/        # Development environment
│   ├── testing/            # Testing environment
│   └── production/         # Production environment
│
├── scripts/                # Utility Scripts
│   └── [automation scripts]
│
├── .gitignore              # Git ignore patterns
├── .editorconfig           # Editor configuration
├── README.md               # This file
├── PROJECT_SETUP.md        # Detailed setup instructions
├── STRUCTURE_GUIDE.md      # Folder structure guide
└── TELIS.md                # TELIS methodology documentation
```

---

## 🧠 TELIS Methodology

This template implements the **Token-Efficient Language Intelligence System** to achieve **<2% code error rate** through:

### Three-Layer Architecture

1. **Layer 1: LSP Symbiosis** (Real-time Truth)
   - Real-time type signatures and API data
   - 90% token savings vs traditional documentation
   - 100% accuracy for language features

2. **Layer 2: Knowledge Shards** (Pattern Libraries)
   - Tiered information (Nano → Micro → Full)
   - Semantic retrieval with confidence thresholds
   - Token budgets of 50/500/2000+

3. **Layer 3: Progressive Context Negotiation**
   - On-demand information escalation
   - AI requests specific data rather than eagerly loading
   - 95% token savings on complex queries

See [TELIS.md](TELIS.md) for complete methodology documentation.

---

## 🧠 BMAD Framework Integration

This template integrates the **BMAD (Breakthrough Method for Agile Ai Driven Development)** framework.

### Key Features
- **19 Specialized Agents**: Switch roles instantly (e.g., "Act as Architect").
- **4-Phase Methodology**: Analysis → Planning → Solutioning → Implementation.
- **Structured Workflows**: Pre-defined paths for PRDs, Architecture, and Coding.

### Quick Start
1.  **Switch Role**: "Act as Product Manager"
2.  **Start Planning**: "Run create-prd"
3.  **Switch Role**: "Act as Architect"
4.  **Design System**: "Run create-architecture"
5.  **Switch Role**: "Act as Developer"
6.  **Build**: "Run develop-story"

See [.context/bmad_roles.md](.context/bmad_roles.md) and [.workflows/bmad-lifecycle.md](.workflows/bmad-lifecycle.md) for details.

---

## 📚 Context Engineering Documents

The `.context/` directory contains five core documents:

| Document | Purpose | Token Budget |
|----------|---------|--------------|
| **instructions.md** | AI role, task guidance, output formatting | N/A |
| **knowledge.md** | Domain info organized in tiers (50/500/2000+) | Dynamic |
| **tools.md** | LSP integration, APIs, environment config | On-demand |
| **summary.md** | Decision logs, work summaries, context compression | Growing |
| **rules.md** | Project rules, coding standards, constraints | N/A |

These documents enable AI systems to:
- Generate code with <2% error rate
- Use 10-100x fewer tokens than traditional approaches
- Maintain context across long development sessions
- Follow project-specific guidelines automatically

---

## 🛠️ Customization Guide

### 1. Update Project Configuration

Edit `.template/project.config.json`:
```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "languages": ["javascript", "python"],
  "framework": "your-framework"
}
```

### 2. Customize Context Documents

Update each file in `.context/`:
- Add your tech stack to `knowledge.md`
- Configure LSP servers in `tools.md`
- Define coding standards in `rules.md`
- Set system role in `instructions.md`

### 3. Adapt Folder Structure

Modify `src/` structure based on your needs:
- **Web App**: `src/components/`, `src/pages/`, `src/services/`
- **API**: `src/controllers/`, `src/models/`, `src/routes/`
- **Library**: `src/lib/`, `src/types/`, `src/index.js`

### 4. Configure Tools

Set up language-specific tools:
```bash
# JavaScript/TypeScript
npm init
npm install --save-dev eslint typescript

# Python
pip install pylint mypy

# etc.
```

---

## ✅ Quality Standards

Following TELIS methodology error rate targets:

| Error Type | Target | Validation |
|------------|--------|------------|
| Syntax Errors | <0.5% | AST parsing |
| Type Errors | <1.0% | Type checker |
| API Misuse | <0.5% | Runtime validation |
| **Total** | **<2.0%** | Combined metrics |

---

## 📖 Documentation

- **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Detailed setup instructions
- **[STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)** - Folder organization guide
- **[TELIS.md](TELIS.md)** - Complete methodology reference
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Detailed 4-phase integration roadmap
- **[docs/](docs/)** - Additional project documentation

---

## 🤝 Working with AI Systems

This template is optimized for AI-assisted development:

### Progressive Context Protocol
```
1. AI starts with Tier 1 (nano) knowledge shards
2. AI requests specific information as needed
3. System injects precise data (LSP or higher tiers)
4. AI generates code with <2% error rate
```

### Example Interaction
```
User: "Add a function to process user data"

AI: "I need the signature for the User type and data validation patterns"

System: [Injects LSP type data + validation shard]

AI: [Generates validated, type-safe code]
```

---

## 🔧 Built-in Features

- ✅ Context engineering documents (TELIS)
- ✅ Optimal folder structure (3-5 depth)
- ✅ Configuration management
- ✅ Testing framework setup
- ✅ Documentation templates
- ✅ Git configuration
- ✅ Editor configuration
- ✅ Validation pipelines

---

## 📝 License

MIT License

---
│   ├── development/        # Development environment
│   ├── testing/            # Testing environment
│   └── production/         # Production environment
│
├── scripts/                # Utility Scripts
│   └── [automation scripts]
│
├── .gitignore              # Git ignore patterns
├── .editorconfig           # Editor configuration
├── README.md               # This file
├── PROJECT_SETUP.md        # Detailed setup instructions
├── STRUCTURE_GUIDE.md      # Folder structure guide
└── TELIS.md                # TELIS methodology documentation
```

---

## 🧠 TELIS Methodology

This template implements the **Token-Efficient Language Intelligence System** to achieve **<2% code error rate** through:

### Three-Layer Architecture

1.  **Layer 1: LSP Symbiosis** (Real-time Truth)
    -   Real-time type signatures and API data
    -   90% token savings vs traditional documentation
    -   100% accuracy for language features

2.  **Layer 2: Knowledge Shards** (Pattern Libraries)
    -   Tiered information (Nano → Micro → Full)
    -   Semantic retrieval with confidence thresholds
    -   Token budgets of 50/500/2000+

3.  **Layer 3: Progressive Context Negotiation**
    -   On-demand information escalation
    -   AI requests specific data rather than eagerly loading
    -   95% token savings on complex queries

See [TELIS.md](TELIS.md) for complete methodology documentation.

---

## 🧠 BMAD Framework Integration

This template integrates the **BMAD (Breakthrough Method for Agile Ai Driven Development)** framework.

### Key Features
-   **19 Specialized Agents**: Switch roles instantly (e.g., "Act as Architect").
-   **4-Phase Methodology**: Analysis → Planning → Solutioning → Implementation.
-   **Structured Workflows**: Pre-defined paths for PRDs, Architecture, and Coding.

### Quick Start
1.  **Switch Role**: "Act as Product Manager"
2.  **Start Planning**: "Run create-prd"
3.  **Switch Role**: "Act as Architect"
4.  **Design System**: "Run create-architecture"
5.  **Switch Role**: "Act as Developer"
6.  **Build**: "Run develop-story"

See [.context/bmad_roles.md](.context/bmad_roles.md) and [.workflows/bmad-lifecycle.md](.workflows/bmad-lifecycle.md) for details.

---

## 📚 Context Engineering Documents

The `.context/` directory contains five core documents:

| Document | Purpose | Token Budget |
|----------|---------|--------------|
| **instructions.md** | AI role, task guidance, output formatting | N/A |
| **knowledge.md** | Domain info organized in tiers (50/500/2000+) | Dynamic |
| **tools.md** | LSP integration, APIs, environment config | On-demand |
| **summary.md** | Decision logs, work summaries, context compression | Growing |
| **rules.md** | Project rules, coding standards, constraints | N/A |

These documents enable AI systems to:
-   Generate code with <2% error rate
-   Use 10-100x fewer tokens than traditional approaches
-   Maintain context across long development sessions
-   Follow project-specific guidelines automatically

---

## 🛠️ Customization Guide

### 1. Update Project Configuration

Edit `.template/project.config.json`:
```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "languages": ["javascript", "python"],
  "framework": "your-framework"
}
```

### 2. Customize Context Documents

Update each file in `.context/`:
-   Add your tech stack to `knowledge.md`
-   Configure LSP servers in `tools.md`
-   Define coding standards in `rules.md`
-   Set system role in `instructions.md`

### 3. Adapt Folder Structure

Modify `src/` structure based on your needs:
-   **Web App**: `src/components/`, `src/pages/`, `src/services/`
-   **API**: `src/controllers/`, `src/models/`, `src/routes/`
-   **Library**: `src/lib/`, `src/types/`, `src/index.js`

### 4. Configure Tools

Set up language-specific tools:
```bash
# JavaScript/TypeScript
npm init
npm install --save-dev eslint typescript

# Python
pip install pylint mypy

# etc.
```

---

## ✅ Quality Standards

Following TELIS methodology error rate targets:

| Error Type | Target | Validation |
|------------|--------|------------|
| Syntax Errors | <0.5% | AST parsing |
| Type Errors | <1.0% | Type checker |
| API Misuse | <0.5% | Runtime validation |
| **Total** | **<2.0%** | Combined metrics |

---

## 📖 Documentation

-   **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Detailed setup instructions
-   **[STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)** - Folder organization guide
-   **[TELIS.md](TELIS.md)** - Complete methodology reference
-   **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Detailed 4-phase integration roadmap
-   **[docs/](docs/)** - Additional project documentation

---

## 🤝 Working with AI Systems

This template is optimized for AI-assisted development:

### Progressive Context Protocol
```
1. AI starts with Tier 1 (nano) knowledge shards
2. AI requests specific information as needed
3. System injects precise data (LSP or higher tiers)
4. AI generates code with <2% error rate
```

### Example Interaction
```
User: "Add a function to process user data"

AI: "I need the signature for the User type and data validation patterns"

System: [Injects LSP type data + validation shard]

AI: [Generates validated, type-safe code]
```

---

## 🔧 Built-in Features

-   ✅ Context engineering documents (TELIS)
-   ✅ Optimal folder structure (3-5 depth)
-   ✅ Configuration management
-   ✅ Testing framework setup
-   ✅ Documentation templates
-   ✅ Git configuration
-   ✅ Editor configuration
-   ✅ Validation pipelines

---

## 📝 License

MIT License

---
│   ├── development/        # Development environment
│   ├── testing/            # Testing environment
│   └── production/         # Production environment
│
├── scripts/                # Utility Scripts
│   └── [automation scripts]
│
├── .gitignore              # Git ignore patterns
├── .editorconfig           # Editor configuration
├── README.md               # This file
├── PROJECT_SETUP.md        # Detailed setup instructions
├── STRUCTURE_GUIDE.md      # Folder structure guide
└── TELIS.md                # TELIS methodology documentation
```

---

## 🧠 TELIS Methodology

This template implements the **Token-Efficient Language Intelligence System** to achieve **<2% code error rate** through:

### Three-Layer Architecture

1.  **Layer 1: LSP Symbiosis** (Real-time Truth)
    -   Real-time type signatures and API data
    -   90% token savings vs traditional documentation
    -   100% accuracy for language features

2.  **Layer 2: Knowledge Shards** (Pattern Libraries)
    -   Tiered information (Nano → Micro → Full)
    -   Semantic retrieval with confidence thresholds
    -   Token budgets of 50/500/2000+

3.  **Layer 3: Progressive Context Negotiation**
    -   On-demand information escalation
    -   AI requests specific data rather than eagerly loading
    -   95% token savings on complex queries

See [TELIS.md](TELIS.md) for complete methodology documentation.

---

## 🧠 BMAD Framework Integration

This template integrates the **BMAD (Breakthrough Method for Agile Ai Driven Development)** framework.

### Key Features
-   **19 Specialized Agents**: Switch roles instantly (e.g., "Act as Architect").
-   **4-Phase Methodology**: Analysis → Planning → Solutioning → Implementation.
-   **Structured Workflows**: Pre-defined paths for PRDs, Architecture, and Coding.

### Quick Start
1.  **Switch Role**: "Act as Product Manager"
2.  **Start Planning**: "Run create-prd"
3.  **Switch Role**: "Act as Architect"
4.  **Design System**: "Run create-architecture"
5.  **Switch Role**: "Act as Developer"
6.  **Build**: "Run develop-story"

See [.context/bmad_roles.md](.context/bmad_roles.md) and [.workflows/bmad-lifecycle.md](.workflows/bmad-lifecycle.md) for details.

---

## 📚 Context Engineering Documents

The `.context/` directory contains five core documents:

| Document | Purpose | Token Budget |
|----------|---------|--------------|
| **instructions.md** | AI role, task guidance, output formatting | N/A |
| **knowledge.md** | Domain info organized in tiers (50/500/2000+) | Dynamic |
| **tools.md** | LSP integration, APIs, environment config | On-demand |
| **summary.md** | Decision logs, work summaries, context compression | Growing |
| **rules.md** | Project rules, coding standards, constraints | N/A |

These documents enable AI systems to:
-   Generate code with <2% error rate
-   Use 10-100x fewer tokens than traditional approaches
-   Maintain context across long development sessions
-   Follow project-specific guidelines automatically

---

## 🛠️ Customization Guide

### 1. Update Project Configuration

Edit `.template/project.config.json`:
```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "languages": ["javascript", "python"],
  "framework": "your-framework"
}
```

### 2. Customize Context Documents

Update each file in `.context/`:
-   Add your tech stack to `knowledge.md`
-   Configure LSP servers in `tools.md`
-   Define coding standards in `rules.md`
-   Set system role in `instructions.md`

### 3. Adapt Folder Structure

Modify `src/` structure based on your needs:
-   **Web App**: `src/components/`, `src/pages/`, `src/services/`
-   **API**: `src/controllers/`, `src/models/`, `src/routes/`
-   **Library**: `src/lib/`, `src/types/`, `src/index.js`

### 4. Configure Tools

Set up language-specific tools:
```bash
# JavaScript/TypeScript
npm init
npm install --save-dev eslint typescript

# Python
pip install pylint mypy

# etc.
```

---

## ✅ Quality Standards

Following TELIS methodology error rate targets:

| Error Type | Target | Validation |
|------------|--------|------------|
| Syntax Errors | <0.5% | AST parsing |
| Type Errors | <1.0% | Type checker |
| API Misuse | <0.5% | Runtime validation |
| **Total** | **<2.0%** | Combined metrics |

---

## 📖 Documentation

-   **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Detailed setup instructions
-   **[STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)** - Folder organization guide
-   **[TELIS.md](TELIS.md)** - Complete methodology reference
-   **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Detailed 4-phase integration roadmap
-   **[docs/](docs/)** - Additional project documentation

---

## 🤝 Working with AI Systems

This template is optimized for AI-assisted development:

### Progressive Context Protocol
```
1. AI starts with Tier 1 (nano) knowledge shards
2. AI requests specific information as needed
3. System injects precise data (LSP or higher tiers)
4. AI generates code with <2% error rate
```

### Example Interaction
```
User: "Add a function to process user data"

AI: "I need the signature for the User type and data validation patterns"

System: [Injects LSP type data + validation shard]

AI: [Generates validated, type-safe code]
```

---

## 🔧 Built-in Features

-   ✅ Context engineering documents (TELIS)
-   ✅ Optimal folder structure (3-5 depth)
-   ✅ Configuration management
-   ✅ Testing framework setup
-   ✅ Documentation templates
-   ✅ Git configuration
-   ✅ Editor configuration
-   ✅ Validation pipelines

---

## 📝 License

MIT License

---

## 🙏 Credits

-   **TELIS Methodology**: Token-Efficient Language Intelligence System
-   **BMAD Framework**: [Breakthrough Method for Agile Ai Driven Development](https://github.com/bmad-code-org/BMAD-METHOD)
-   **Fabien Dostie**: [AetherBase](https://github.com/fabiendostie/AetherBase)
---

**Ready to build something amazing?** Start by reading [PROJECT_SETUP.md](PROJECT_SETUP.md)!
