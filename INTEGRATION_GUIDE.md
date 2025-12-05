# TELIS Integration Guide

This guide provides detailed, step-by-step instructions for implementing the **Token-Efficient Language Intelligence System (TELIS)** in your project. It covers the 4-phase roadmap: Foundation, Retrieval, Validation, and Optimization.

---

## Phase 1: Foundation
**Goal:** Establish the core infrastructure for real-time language intelligence and basic knowledge storage.

### 1.1 LSP Client Integration
The Language Server Protocol (LSP) provides real-time type information, signatures, and diagnostics.

#### JavaScript / TypeScript
We use `typescript-language-server` for JS/TS support.

**Installation:**
```bash
npm install -g typescript-language-server typescript
```
*   [Official Repository](https://github.com/typescript-language-server/typescript-language-server)
*   [NPM Package](https://www.npmjs.com/package/typescript-language-server)

**Integration Steps:**
1.  **Start the Server:** Run `typescript-language-server --stdio` as a subprocess.
2.  **Initialize:** Send the `initialize` request with your project root URI.
3.  **Open Document:** Send `textDocument/didOpen` when a file is accessed.
4.  **Query:** Send `textDocument/hover` or `textDocument/completion` to get data.

#### Python
We recommend `python-lsp-server` (community driven) or `pyright` (Microsoft).

**Installation (pylsp):**
```bash
pip install python-lsp-server
```
*   [Official Repository](https://github.com/python-lsp/python-lsp-server)
*   [PyPI Package](https://pypi.org/project/python-lsp-server/)

**Integration Steps:**
1.  **Start the Server:** Run `pylsp` as a subprocess.
2.  **Initialize:** Similar to JS, send the `initialize` request.
3.  **Configuration:** You can configure plugins (like flake8, pydocstyle) in the initialization options.

### 1.2 Basic Shard Storage (SQLite)
SQLite is used to store "Knowledge Shards" - small, self-contained units of coding knowledge.

#### Python Integration
Python has built-in SQLite support.

**Setup:**
```python
import sqlite3

# Connect to database (creates it if missing)
conn = sqlite3.connect('.context/knowledge.db')
cursor = conn.cursor()

# Create Shards Table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS shards (
        id TEXT PRIMARY KEY,
        language TEXT,
        topics TEXT,
        content TEXT,
        embedding BLOB,
        tier TEXT
    )
''')
conn.commit()
```
*   [Python SQLite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

#### Node.js Integration
We recommend `better-sqlite3` for performance and synchronous API (easier for scripting).

**Installation:**
```bash
npm install better-sqlite3
```
*   [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)

**Setup:**
```javascript
const Database = require('better-sqlite3');
const db = new Database('.context/knowledge.db');

// Create Shards Table
db.exec(`
    CREATE TABLE IF NOT EXISTS shards (
        id TEXT PRIMARY KEY,
        language TEXT,
        topics TEXT,
        content TEXT,
        embedding BLOB,
        tier TEXT
    )
`);
```

---

## Phase 2: Retrieval
**Goal:** Implement semantic search to find the right knowledge shard for a given query.

### 2.1 Embedding Pipeline (UniXcoder)
UniXcoder is a model optimized for code understanding. We use it to convert queries and shards into vectors.

**Prerequisites:**
```bash
pip install torch transformers
```

**Implementation (Python):**
```python
from transformers import AutoTokenizer, AutoModel
import torch

# Load Model
tokenizer = AutoTokenizer.from_pretrained("microsoft/unixcoder-base")
model = AutoModel.from_pretrained("microsoft/unixcoder-base")

def get_embedding(text):
    tokens = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        embeddings = model(**tokens)[0][:, 0, :]
    return embeddings.numpy().flatten()
```
*   [UniXcoder on HuggingFace](https://huggingface.co/microsoft/unixcoder-base)
*   [Transformers Library](https://huggingface.co/docs/transformers/index)

### 2.2 Shard Search Index
Implement a simple cosine similarity search to find relevant shards.

**Search Logic:**
1.  Embed the user's query using `get_embedding()`.
2.  Fetch all shard embeddings from SQLite.
3.  Calculate cosine similarity between query vector and shard vectors.
4.  Return the top N shards with similarity > threshold (e.g., 0.7).

---

## Phase 3: Validation
**Goal:** Ensure generated code is syntactically correct before showing it to the user.

### 3.1 AST Validation Gate
Parse the code into an Abstract Syntax Tree (AST). If parsing fails, the code has syntax errors.

#### JavaScript Validation
Use `acorn` for fast parsing.

**Installation:**
```bash
npm install acorn
```

**Usage:**
```javascript
const acorn = require("acorn");

function validateJS(code) {
    try {
        acorn.parse(code, { ecmaVersion: 2020 });
        return { valid: true };
    } catch (e) {
        return { valid: false, error: e.message, line: e.loc.line };
    }
}
```

#### Python Validation
Use the built-in `ast` module.

**Usage:**
```python
import ast

def validate_python(code):
    try:
        ast.parse(code)
        return {"valid": True}
    except SyntaxError as e:
        return {"valid": False, "error": str(e), "line": e.lineno}
```

### 3.2 Error Recovery Pipeline
If validation fails:
1.  Capture the error message and line number.
2.  Feed the error back to the AI model.
3.  Request a regeneration with the specific error context.

---

## Phase 4: Optimization
**Goal:** Reduce latency and token usage.

### 4.1 Cache Warming
Pre-load frequently used shards into memory at startup.

**Strategy:**
1.  Identify "Core" shards (Tier 1) for each language.
2.  Load these into a Redis or in-memory dictionary when the agent starts.
3.  Skip the SQLite lookup for these common topics.

### 4.2 Shard Compression (Symbolic Encoding)
Map complex, repetitive code patterns to short symbols.

**Concept:**
Instead of injecting a full 50-line boilerplate, inject a symbol like `@js.boilerplate.express`.
The AI learns to recognize this symbol. When it generates code, it uses the symbol.
A post-processing step expands the symbol back into full code.

**Implementation:**
1.  Create a dictionary of `Symbol -> Code Block`.
2.  **Input:** Inject `Symbol` definitions into the system prompt.
3.  **Output:** Regex replace `Symbol` in the AI's output with `Code Block`.

---

## Resources & Links

*   **LSP Specification:** [https://microsoft.github.io/language-server-protocol/](https://microsoft.github.io/language-server-protocol/)
*   **SQLite:** [https://www.sqlite.org/index.html](https://www.sqlite.org/index.html)
*   **HuggingFace Transformers:** [https://huggingface.co/docs/transformers/](https://huggingface.co/docs/transformers/)
*   **Acorn Parser:** [https://github.com/acornjs/acorn](https://github.com/acornjs/acorn)
