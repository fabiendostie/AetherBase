# Project Setup Guide

Complete setup instructions for initializing and customizing this universal project template.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Configuration](#configuration)
3. [Environment Setup](#environment-setup)
4. [Dependency Management](#dependency-management)
5. [Customization](#customization)
6. [Verification](#verification)

---

## Initial Setup

### Step 1: Copy Template

```bash
# Option A: Clone from repository
git clone [template-url] my-project-name
cd my-project-name
rm -rf .git  # Remove template git history

# Option B: Copy template directory
cp -r /path/to/template my-project-name
cd my-project-name
```

### Step 2: Initialize Version Control

```bash
git init
git add .
git commit -m "Initial commit from template"
```

### Step 3: Update Project Metadata

Edit `.template/project.config.json`:

```json
{
    "name": "my-awesome-project",
    "version": "0.1.0",
    "description": "A brief description of your project",
    "author": "Your Name",
    "license": "MIT",
    "languages": ["javascript", "python"],
    "framework": "express",
    "repository": "https://github.com/username/repo"
}
```

---

## Configuration

### Context Engineering Documents

Update the five core documents in `.context/`:

#### 1. instructions.md

```markdown
Replace [PROJECT_NAME] with your actual project name
Add project-specific architectural patterns
Define your coding style preferences
Specify testing requirements
```

#### 2. knowledge.md

```markdown
List your technology stack with versions
Create knowledge shards for your specific domain
Add external documentation links
Define your domain glossary
```

#### 3. tools.md

```markdown
Configure LSP servers for your languages
Define your build system commands
List API endpoints and interfaces
Set environment variables
```

#### 4. summary.md

```markdown
Write initial project overview
Document architectural decisions
Set project objectives
Define milestones
```

#### 5. rules.md

```markdown
Set naming conventions for your language(s)
Define code style rules
Specify testing coverage requirements
Set security policies
```

---

## Environment Setup

### Development Environment

#### For Node.js Projects

```bash
# Initialize package.json
npm init -y

# Install development dependencies
npm install --save-dev eslint prettier typescript

# Update package.json scripts
{
  "scripts": {
    "dev": "node src/index.js",
    "test": "jest",
    "lint": "eslint src/",
    "build": "tsc"
  }
}
```

#### For Python Projects

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Create requirements.txt
cat > requirements.txt << EOF
# Core dependencies
requests>=2.28.0
# Development dependencies
pytest>=7.0.0
pylint>=2.15.0
mypy>=0.990
EOF

# Install dependencies
pip install -r requirements.txt
```

#### For Other Languages

Follow your language-specific initialization:

- **Go**: `go mod init`
- **Rust**: `cargo init`
- **Java**: Maven or Gradle setup
- **C#**: `dotnet new`

---

## Dependency Management

### Language Server Protocol (LSP) Setup

Configure LSP servers for your primary languages:

#### JavaScript/TypeScript

```bash
npm install -g typescript-language-server
```

#### Python

```bash
pip install python-lsp-server
# or
pip install pyright
```

#### Other Languages

- **Go**: `go install golang.org/x/tools/gopls@latest`
- **Rust**: `rustup component add rust-analyzer`
- **Java**: Install Java Language Server

Update `.context/tools.md` with your LSP configuration.

---

## Customization

### 1. Folder Structure Adaptation

Choose structure based on project type:

#### Web Application

```
src/
├── components/     # UI components
├── pages/          # Page components
├── services/       # Business logic
├── utils/          # Helper functions
├── hooks/          # Custom hooks (React)
├── styles/         # CSS/styling
└── index.js        # Entry point
```

#### REST API

```
src/
├── controllers/    # Request handlers
├── models/         # Data models
├── routes/         # API routes
├── middleware/     # Middleware functions
├── services/       # Business logic
├── utils/          # Helper functions
└── index.js        # Server entry
```

#### Library/Package

```
src/
├── lib/            # Main library code
├── types/          # Type definitions
├── utils/          # Utilities
├── index.js        # Public API
└── internal/       # Internal helpers
```

### 2. Testing Setup

#### Jest (JavaScript)

```bash
npm install --save-dev jest @types/jest
```

Create `jest.config.js`:

```javascript
module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.js'],
    testMatch: ['**/*.test.js'],
};
```

#### pytest (Python)

```bash
pip install pytest pytest-cov
```

Create `pytest.ini`:

```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
```

### 3. Configuration Files

#### Create .gitignore

```bash
# Use the provided template or generate one
# Example for Node.js:
node_modules/
dist/
build/
.env
*.log
coverage/
```

#### Create .editorconfig

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 4. Workflow Integration

#### Install Workflow Tools

```bash
# Install core workflow dependencies
npm install -D husky @commitlint/cli @commitlint/config-conventional
npm install -D eslint prettier jest @playwright/test

# Initialize Husky
npx husky init
```

#### Configure Quality Gates

The template comes with pre-configured Husky hooks in `.husky/`:

- `pre-commit`: Runs linting and type checking
- `commit-msg`: Enforces conventional commits
- `pre-push`: Runs tests and checks coverage (85% threshold)

#### Configure CI/CD

The template includes a comprehensive GitHub Actions pipeline in `.github/workflows/ci-cd.yml`.

**Required Secrets:**
Add these to your GitHub Repository Secrets:

- `STAGING_DEPLOY_TOKEN`
- `PROD_DEPLOY_TOKEN`
- `STAGING_DATABASE_URL`
- `PROD_DATABASE_URL`

**Workflow Modes:**

- **Team**: Enable branch protection and PR approvals.
- **Solo**: Skip branch protection, use direct commits or simplified PRs.
  See `.workflows/workflow-modes.md` for details.

---

## Verification

### Checklist

- [ ] Project metadata updated in `.template/project.config.json`
- [ ] All `.context/` files customized
- [ ] Folder structure adapted for project type
- [ ] Dependencies installed
- [ ] LSP servers configured
- [ ] Tests run successfully
- [ ] Linting passes
- [ ] Git repository initialized
- [ ] README.md updated with project details
- [ ] BMAD documentation folders created (`docs/analysis`, `docs/planning`, etc.)
- [ ] Documentation reviewed

### Test Command Examples

```bash
# JavaScript/Node.js
npm test
npm run lint

# Python
pytest
pylint src/
mypy src/

# Build (if applicable)
npm run build
# or
python setup.py build
```

---

## Next Steps

1. **Read [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md)** for folder organization details
2. **Review [TELIS.md](TELIS.md)** to understand the methodology
3. **Start coding** following the `.context/rules.md` guidelines
4. **Update `.context/summary.md`** as you make progress

---

## Troubleshooting

### Common Issues

**Issue**: LSP not working

```bash
# Solution: Verify LSP server installation
npm list -g typescript-language-server
# or
pip show python-lsp-server
```

**Issue**: Tests failing

```bash
# Solution: Check test configuration
npm run test -- --verbose
# or
pytest -v
```

**Issue**: Linting errors

```bash
# Solution: Auto-fix where possible
npm run lint -- --fix
# or
pylint --generate-rcfile > .pylintrc
```

---

## Getting Help

- Review context documents in `.context/`
- Consult project documentation in `docs/`
- Check TELIS methodology in `TELIS.md`
- Refer to framework-specific guides

---

**You're all set!** Start building your project with confidence, knowing you have optimal structure and context engineering in place.
