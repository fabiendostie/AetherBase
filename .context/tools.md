# Tools and Environment Context

## External Tools, APIs, and Environment Interfaces

### Purpose
This document describes external tools, APIs, and environment interfaces that AI systems can interact with to fetch real-time or specialized data. Following TELIS Layer 1 (LSP Symbiosis) principles.

---

## Language Server Protocol (LSP) Integration

### Supported Languages

#### [Language 1]
```yaml
language: "[name]"
lsp_server: "[server_name]"
capabilities:
  - hover             # Type signatures and docs (20-50 tokens)
  - completion        # Valid completions (10-30 tokens)
  - signatureHelp     # Function parameters (15-40 tokens)
  - definition        # Symbol locations (5-10 tokens)
  - diagnostic        # Error detection (10-20 tokens)
validation:
  parser: "[parser_name]"
  type_check: [true|false]
  linter: "[linter_name]"
```

**LSP Methods Available**:
- `textDocument/hover`: Get type signatures and documentation
- `textDocument/completion`: Get valid code completions
- `textDocument/signatureHelp`: Get function signatures
- `textDocument/definition`: Navigate to symbol definitions
- `textDocument/diagnostic`: Get real-time error diagnostics

#### [Language 2]
[Repeat structure for each language]

---

## Tool Definitions

### Development Tools

#### Build System
```yaml
tool: "[build_tool]"
commands:
  build: "[build command]"
  test: "[test command]"
  run: "[run command]"
  clean: "[clean command]"
```

#### Package Manager
```yaml
tool: "[package_manager]"
commands:
  install: "[install command]"
  update: "[update command]"
  add: "[add dependency command]"
  remove: "[remove dependency command]"
```

#### Version Control
```yaml
tool: "git"
common_workflows:
  - name: "Feature branch workflow"
    steps:
      - "git checkout -b feature/[name]"
      - "git add [files]"
      - "git commit -m '[message]'"
      - "git push origin feature/[name]"
```

---

## API Interfaces

### Internal APIs

#### [API Name 1]
```yaml
api: "[name]"
base_url: "[url]"
authentication: "[method]"
endpoints:
  - path: "/[endpoint]"
    method: "[GET|POST|PUT|DELETE]"
    description: "[purpose]"
    request_format: "[format]"
    response_format: "[format]"
```

### External APIs

#### [API Name 2]
```yaml
api: "[name]"
documentation: "[url]"
rate_limits: "[limits]"
authentication: "[method]"
```

---

## Environment Configuration

### Development Environment
```yaml
environment: "development"
variables:
  - name: "[VAR_NAME]"
    description: "[purpose]"
    required: [true|false]
    default: "[value]"
```

### Testing Environment
```yaml
environment: "testing"
variables:
  - name: "[VAR_NAME]"
    description: "[purpose]"
    required: [true|false]
```

### Production Environment
```yaml
environment: "production"
variables:
  - name: "[VAR_NAME]"
    description: "[purpose]"
    required: [true|false]
```

---

## LSP Query Pattern

Following TELIS methodology for token-efficient LSP usage:

```yaml
query_pattern:
  step_1: "Check if language has LSP support"
  step_2: "Route to LSP for type/signature queries"
  step_3: "Parse JSON response into compressed format"
  step_4: "Inject only relevant fields (avg: 30 tokens)"
  
error_handling:
  - condition: "LSP timeout (>500ms)"
    action: "Fallback to knowledge shards"
  - condition: "LSP unavailable"
    action: "Fallback to knowledge shards"
  - condition: "Partial response"
    action: "Supplement from knowledge shards"
```

---

## Tool Context Injection Guidelines

**Dynamic Inclusion**: Only include relevant tool context based on the current task

**Modular Structure**: Keep tool context modular to avoid cluttering input

**Execution Clarity**: Ensure AI knows how to:
1. Execute tool commands
2. Interpret tool outputs
3. Handle tool errors
4. Chain tool operations

---

## Token Efficiency Example

### Traditional Approach
```
Full documentation injection:
"The function processData takes an array of objects and returns
a transformed array with additional properties..."
= ~150 tokens
```

### LSP Approach (TELIS Layer 1)
```json
{
  "signature": "processData(data: DataObject[]): TransformedData[]",
  "params": [{"name": "data", "type": "DataObject[]"}],
  "returns": "TransformedData[]"
}
```
Compressed: `processData(data: DataObject[]): TransformedData[]`
= ~15 tokens

**Token Savings: 90%**

---

## Sample Tool Outputs

### LSP Hover Response
```json
{
  "contents": {
    "kind": "markdown",
    "value": "```typescript\nfunction example(param: string): number\n```\nReturns the length of the string"
  }
}
```

### Diagnostic Response
```json
{
  "diagnostics": [
    {
      "range": {"start": {"line": 10, "character": 5}, "end": {"line": 10, "character": 15}},
      "severity": 1,
      "message": "Type 'string' is not assignable to type 'number'"
    }
  ]
}
```

---

*This document is part of the `.context/` directory following TELIS Layer 1 (LSP Symbiosis) principles for real-time, token-efficient language intelligence.*
