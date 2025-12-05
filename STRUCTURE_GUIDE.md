# Project Structure Guide

Comprehensive guide to the folder organization and file naming conventions in this universal project template.

---

## Philosophy

This structure follows **optimal folder organization principles**:

1. **Hierarchical Organization**: Broad categories broken down into specific subcategories
2. **Limited Depth**: 3-5 levels maximum for easy navigation
3. **Consistent Naming**: Clear, descriptive names with standardized formats
4. **Scalability**: Structure grows naturally with project complexity
5. **Clarity**: Purpose of each directory immediately obvious

---

## Core Directories

### .context/ - Context Engineering Documents

**Purpose**: AI context engineering following TELIS methodology

**Contents**:

```
.context/
├── instructions.md    # AI system role and task guidance
├── knowledge.md       # Domain-specific information (tiered)
├── tools.md           # LSP integration & API specs
├── summary.md         # Project summaries & decision logs
└── rules.md           # Project rules & constraints
```

**Usage**:

- Contains all information needed for AI-assisted development
- Organized in three tiers: Nano (50 tokens), Micro (500), Full (2000+)
- Updated as project evolves

**Best Practices**:

- Keep instructions concise and actionable
- Use tiered knowledge structure (Layer 2 of TELIS)
- Update summary regularly with decisions
- Define rules clearly and unambiguously

---

### .template/ - Reusable Templates

**Purpose**: Store reusable templates and boilerplate code

**Contents**:

```
.template/
├── project.config.json    # Project metadata
├── component.template     # Component template
├── test.template          # Test file template
├── api.template           # API endpoint template
└── [custom templates]     # Your templates
```

**Usage**:

- Quick scaffolding of new files
- Consistent structure across similar files
- Project initialization data

**Naming Convention**: `[name].template[.ext]`

---

### .workflows/ - Automation Workflows

**Purpose**: Automation scripts and workflow definitions

**Contents**:

```
.workflows/
├── build.md           # Build workflow
├── deploy.md          # Deployment workflow
├── test.md            # Testing workflow
└── [custom].md        # Custom workflows
```

**Format**: Markdown files with step-by-step instructions

**Usage**:

- Document automated processes
- Define CI/CD pipelines
- Script orchestration

---

### docs/ - Documentation

**Purpose**: All project documentation

**Structure**:

```
docs/
├── architecture/
│   ├── overview.md
│   ├── system-design.md
│   └── data-flow.md
├── api/
│   ├── endpoints.md
│   ├── authentication.md
│   └── examples.md
├── guides/
│   ├── user-guide.md
│   ├── developer-guide.md
│   └── deployment-guide.md
└── decisions/
    └── [ADR files]    # Architecture Decision Records
```

**Naming Convention**:

- Files: `lowercase-with-dashes.md`
- Folders: `lowercase` single words or `compound-words`

**Best Practices**:

- Use markdown for all documentation
- Include diagrams (mermaid, images)
- Keep docs close to code when possible
- Version control all documentation

---

### src/ - Source Code

**Purpose**: All application source code

**Adaptable Structure** (choose based on project type):

#### Option A: Feature-Based (Recommended for large apps)

```
src/
├── core/              # Core business logic
│   ├── models/
│   ├── services/
│   └── interfaces/
├── features/
│   ├── feature-a/
│   │   ├── components/
│   │   ├── services/
│   │   └── index.js
│   └── feature-b/
├── shared/            # Shared utilities
│   ├── utils/
│   ├── hooks/
│   └── constants/
└── index.js           # Entry point
```

#### Option B: Layer-Based (Traditional architecture)

```
src/
├── controllers/       # Request handlers
├── models/            # Data models
├── views/             # View layer
├── services/          # Business logic
├── middleware/        # Middleware functions
├── utils/             # Helper functions
└── index.js           # Entry point
```

#### Option C: Library Structure

```
src/
├── lib/               # Main library code
│   ├── core/
│   └── plugins/
├── types/             # Type definitions
├── utils/             # Utilities
└── index.js           # Public API
```

**Naming Conventions**:

- **Files**: `camelCase.js`, `PascalCase.jsx` (components), `kebab-case.js`
- **Folders**: `lowercase` or `kebab-case`
- **Classes**: `PascalCase`
- **Functions**: `camelCase`

**Depth Limit**: Maximum 4-5 levels deep

---

### tests/ - Test Files

**Purpose**: All test files

**Structure**:

```
tests/
├── unit/              # Unit tests
│   └── [mirrors src structure]
├── integration/       # Integration tests
│   └── [test suites]
├── e2e/               # End-to-end tests
│   └── [scenarios]
├── fixtures/          # Test data
│   └── [data files]
└── helpers/           # Test utilities
    └── [helper files]
```

**Naming Convention**:

- Unit tests: `[filename].test.js` or `[filename].spec.js`
- E2E tests: `[scenario].e2e.js`
- Fixtures: `[data-name].fixture.json`

**Best Practices**:

- Mirror `src/` structure in `unit/`
- Group integration tests by feature
- Keep fixtures separate
- Use descriptive test names

---

### config/ - Configuration

**Purpose**: Environment and application configuration

**Structure**:

```
config/
├── default.json       # Default configuration
├── development.json   # Development overrides
├── testing.json       # Testing environment
├── production.json    # Production settings
└── custom-env.json    # Custom environments
```

**Alternative Structure** (for complex configs):

```
config/
├── environments/
│   ├── development/
│   ├── testing/
│   └── production/
├── database.config.js
├── api.config.js
└── app.config.js
```

**Security**:

- **Never commit secrets** (use environment variables)
- Use `.env` files (add to `.gitignore`)
- Document required variables

---

### scripts/ - Utility Scripts

**Purpose**: Build scripts, deployment scripts, utilities

**Structure**:

```
scripts/
├── build/
│   ├── build-prod.js
│   └── build-dev.js
├── deploy/
│   ├── deploy-staging.sh
│   └── deploy-prod.sh
├── db/
│   ├── migrate.js
│   └── seed.js
└── utils/
    └── [helper scripts]
```

**Naming Convention**: `verb-noun.[ext]`

- Examples: `build-app.js`, `deploy-prod.sh`, `seed-database.js`

**Best Practices**:

- Make scripts executable (`chmod +x`)
- Add shebang for shell scripts
- Include usage documentation
- Error handling and logging

---

## File Naming Conventions

### General Rules

**Consistency**: Choose ONE convention per file type and stick to it

**Descriptive**: Names should clearly indicate content/purpose

**Length**: Balance between brevity and clarity (2-4 words ideal)

### Common Patterns

| File Type  | Convention  | Example               |
| ---------- | ----------- | --------------------- |
| Components | PascalCase  | `UserProfile.jsx`     |
| Services   | camelCase   | `authService.js`      |
| Utilities  | camelCase   | `formatDate.js`       |
| Constants  | UPPER_SNAKE | `API_CONSTANTS.js`    |
| Tests      | [name].test | `userService.test.js` |
| Config     | kebab-case  | `database-config.js`  |
| Docs       | kebab-case  | `setup-guide.md`      |
| Types      | PascalCase  | `UserType.ts`         |

### Date Formatting

When including dates in filenames:

```
ISO 8601 format: YYYY-MM-DD
Example: "Project_Report_2025-12-03.pdf"
```

---

## Depth Management

### Ideal Depth: 3-5 Levels

**Too Shallow** (poor organization):

```
src/
├── everything.js      ❌ No organization
└── more-stuff.js
```

**Too Deep** (hard to navigate):

```
src/
└── features/
    └── user/
        └── profile/
            └── components/
                └── settings/
                    └── advanced/
                        └── privacy/  ❌ 8 levels deep!
```

**Optimal** (3-5 levels):

```
src/
├── features/
│   └── user/
│       ├── profile/           ✅ 3 levels
│       └── settings/
└── shared/
    └── components/            ✅ 2 levels
```

### When to Flatten

If a folder has only 1 child for extended depth, consider flattening:

```
Before:
src/core/services/auth/index.js

After:
src/core/authService.js
```

---

## Scalability Guidelines

### Start Simple

```
src/
├── index.js
├── app.js
└── utils.js
```

### Grow Organically

```
src/
├── components/
│   ├── Header.js
│   └── Footer.js
├── services/
│   └── api.js
└── index.js
```

### Refactor When Needed

**Triggers for restructuring**:

- Folder has >10 files
- Related files in different locations
- Depth exceeds 5 levels
- Purpose of folder unclear

---

## Project Type Examples

### SPA (Single Page Application)

```
src/
├── components/
├── pages/
├── services/
├── hooks/
├── context/
├── styles/
└── App.js
```

### API Server

```
src/
├── routes/
├── controllers/
├── models/
├── middleware/
├── services/
└── server.js
```

### CLI Tool

```
src/
├── commands/
├── lib/
├── utils/
└── cli.js
```

### Mobile App (React Native)

```
src/
├── screens/
├── components/
├── navigation/
├── services/
├── assets/
└── App.js
```

---

## Best Practices Summary

1. ✅ **Limit depth to 3-5 levels**
2. ✅ **Use consistent naming conventions**
3. ✅ **Group related files together**
4. ✅ **Mirror test structure to src**
5. ✅ **Keep configuration separate**
6. ✅ **Document folder purposes**
7. ✅ **Refactor as project grows**
8. ✅ **Follow language/framework conventions**

---

## Maintenance

### Regular Reviews

**Monthly**:

- Check for orphaned files
- Verify naming consistency
- Ensure depth limits

**Per Sprint**:

- Update `.context/summary.md`
- Add new knowledge shards
- Document architectural changes

**As Needed**:

- Refactor overcrowded folders
- Flatten unnecessary depth
- Reorganize when confusion arises

---

_This guide ensures your project remains organized, navigable, and scalable as it grows. Follow these principles and adapt to your specific needs!_
