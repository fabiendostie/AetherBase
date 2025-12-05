# Project Rules and Constraints

## Project-Specific Rules and Constraints

### Purpose

This document defines project-specific rules, constraints, coding standards, and conventions that AI systems must follow. These rules complement the general instructions and ensure consistency across the codebase.

---

## Code Quality Standards

### Error Rate Targets (TELIS Compliance)

Following Token-Efficient Language Intelligence System methodology:

| Error Type           | Target Rate | Validation Method      |
| -------------------- | ----------- | ---------------------- |
| **Syntax Errors**    | <0.5%       | AST parse success rate |
| **Type Errors**      | <1.0%       | Type checker pass rate |
| **API Misuse**       | <0.5%       | Runtime error rate     |
| **Total Error Rate** | <2.0%       | Combined metrics       |

### Validation Requirements

All code must pass:

1. **AST Parsing** - Syntactically valid code
2. **Type Checking** - Type-safe operations (when applicable)
3. **Linting** - Project style compliance

---

## Coding Standards

### Naming Conventions

#### Files and Directories

```yaml
files:
    pattern: '[descriptive_name].[extension]'
    case: 'lowercase_with_underscores' # or "camelCase" or "kebab-case"
    examples:
        - 'user_controller.js'
        - 'data_processor.py'
        - 'api_client.ts'

directories:
    pattern: '[category]/[subcategory]'
    depth_limit: 3-5 levels
    case: 'lowercase_with_underscores'
    examples:
        - 'src/core/utils'
        - 'tests/unit/services'
```

#### Code Elements

```yaml
variables:
    case: 'camelCase' # Adjust based on language
    descriptive: true
    examples:
        - 'userData'
        - 'processingQueue'
        - 'apiResponse'

constants:
    case: 'UPPER_SNAKE_CASE'
    examples:
        - 'MAX_RETRY_ATTEMPTS'
        - 'API_BASE_URL'
        - 'DEFAULT_TIMEOUT'

functions:
    case: 'camelCase' # Adjust based on language
    verb_based: true
    examples:
        - 'processUserData()'
        - 'validateInput()'
        - 'fetchApiResults()'

classes:
    case: 'PascalCase'
    noun_based: true
    examples:
        - 'UserController'
        - 'DataProcessor'
        - 'ApiClient'
```

### Code Style

#### Formatting

- **Indentation**: [spaces|tabs] ([2|4] spaces)
- **Line Length**: Maximum [80|100|120] characters
- **Trailing Whitespace**: Remove all trailing whitespace
- **File Endings**: Newline at end of file

#### Comments

```yaml
comments:
    required_for:
        - Public APIs
        - Complex algorithms
        - Non-obvious business logic
    format:
        inline: '// Brief explanation'
        block: '/* Multi-line explanation */'
        documentation: '[JSDoc|pydoc|etc.] standard'
```

---

## Architecture Constraints

### Project Structure

```
project/
├── .context/          # Context engineering documents (TELIS)
├── .template/         # Reusable templates
├── .workflows/        # Automation workflows
├── docs/              # Project documentation
├── src/               # Source code
│   ├── core/          # Core business logic
│   ├── utils/         # Utility functions
│   └── [modules]/     # Feature modules
├── tests/             # Test files
├── config/            # Configuration files
└── scripts/           # Utility scripts
```

### Module Organization

- **Single Responsibility**: Each module has one clear purpose
- **Dependency Direction**: [Specify allowed dependency flow]
- **Circular Dependencies**: Not allowed
- **External Dependencies**: Must be declared in [package.json|requirements.txt|etc.]

---

## Development Workflow Rules

### Version Control

```yaml
branching:
    main: 'main' # Production-ready code
    develop: 'develop' # Integration branch
    features: 'feature/[name]'
    fixes: 'fix/[name]'
    hotfixes: 'hotfix/[name]'

commit_messages:
    format: '[type]([scope]): [subject]'
    types:
        - feat # New feature
        - fix # Bug fix
        - docs # Documentation
        - style # Formatting
        - refactor # Code restructuring
        - test # Tests
        - chore # Maintenance
    examples:
        - 'feat(auth): add user authentication'
        - 'fix(api): resolve timeout issue'
```

### Code Review Requirements

- [ ] All tests pass (Unit, Integration, E2E)
- [ ] Code coverage ≥ 85%
- [ ] Code follows style guide (Linting passed)
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance acceptable

### Enforcement

- **Local**: Husky hooks (pre-commit, pre-push)
- **CI/CD**: GitHub Actions pipeline
- **Process**: Branch protection rules (Team mode)

---

## Testing Requirements

### Test Coverage

```yaml
coverage_targets:
    minimum: '85%'
    critical_paths: '100%'

test_types:
    unit: 'Test individual functions/classes'
    integration: 'Test module interactions'
    e2e: 'Test complete user workflows'
```

### Test Organization

```yaml
structure:
    location: 'tests/'
    naming: '[feature].[test|spec].[ext]'
    organization: 'Mirror src/ structure'
```

---

## Security Rules

### Data Handling

- **Sensitive Data**: Never commit secrets, API keys, credentials
- **Input Validation**: Validate all external inputs
- **Output Encoding**: Encode outputs to prevent injection
- **Error Messages**: Don't leak sensitive information

### Dependencies

- **Vulnerability Scanning**: Regular dependency audits
- **Version Pinning**: Lock dependency versions
- **Update Policy**: [Strategy for updating dependencies]

---

## Performance Constraints

### Response Times

```yaml
targets:
    api_response: '<200ms (p95)'
    page_load: '<2s (first contentful paint)'
    database_query: '<100ms (typical)'
```

### Resource Limits

```yaml
limits:
    memory: '[limit]'
    cpu: '[limit]'
    file_size: '[limit]'
```

---

## Documentation Requirements

### Code Documentation

- **Public APIs**: Full documentation required
- **Internal Functions**: Brief description of purpose
- **Complex Logic**: Explain the "why" not just the "what"

### Project Documentation

- **README.md**: Project overview and setup
- **CHANGELOG.md**: Version history
- **docs/**: Detailed guides and references

---

## Prohibited Practices

**Never**:

- Commit secrets or credentials
- Use deprecated APIs without documented reason
- Bypass error handling
- Ignore linting errors
- Hard-code configuration values
- Use `any` type (in typed languages) without justification
- Disable security features

---

## Language-Specific Rules

### [Language 1]

```yaml
specific_rules:
    - '[Rule 1]'
    - '[Rule 2]'
    - '[Rule 3]'
```

### [Language 2]

```yaml
specific_rules:
    - '[Rule 1]'
    - '[Rule 2]'
    - '[Rule 3]'
```

---

## Exceptions and Overrides

When rules must be broken:

1. Document the reason with `// EXCEPTION:` comment
2. Get team approval (for team projects)
3. Add to technical debt log
4. Create ticket for resolution

---

_This document is part of the `.context/` directory and defines strict guidelines that must be followed by all contributors and AI systems working on this project._
