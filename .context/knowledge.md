# Knowledge Context

## Domain-Specific Information and References

### Purpose

This document supplies relevant domain information, facts, and data that AI systems need for accurate responses. Following TELIS methodology, knowledge is organized in **hierarchical tiers** for token-efficient retrieval.

---

## Knowledge Tier System

### Tier 1: Nano (50 tokens budget)

**Purpose**: Quick syntax reminders and cheatsheet references

```yaml
tier_1_nano:
    description: 'Syntax-only reference'
    token_budget: 50
    use_case: 'Quick syntax reminders'
```

**Example Content**:

- Language syntax patterns
- Common shortcuts
- Quick reference commands

### Tier 2: Micro (500 tokens budget)

**Purpose**: Common patterns and gotchas

```yaml
tier_2_micro:
    description: 'Common patterns + gotchas'
    token_budget: 500
    use_case: 'Pattern selection, avoiding pitfalls'
```

**Example Content**:

- Design patterns
- Best practices
- Common pitfalls to avoid
- Framework-specific patterns

### Tier 3: Full (2000+ tokens)

**Purpose**: Complete API reference and detailed documentation

```yaml
tier_3_full:
    description: 'Complete API reference'
    token_budget: 2000+
    access: 'on_demand_only'
    use_case: 'Rare/complex API usage'
```

**Example Content**:

- Comprehensive API documentation
- Detailed architecture guides
- In-depth technical specifications

---

## Project Knowledge Base

### Architecture Overview

[Add high-level architecture description]

**Key Components**:

- Component 1: [Description]
- Component 2: [Description]
- Component 3: [Description]

### Technology Stack

[List primary technologies, frameworks, and libraries]

**Languages**:

- [Language 1]: [Version] - [Purpose]
- [Language 2]: [Version] - [Purpose]

**Frameworks**:

- [Framework 1]: [Version] - [Purpose]
- [Framework 2]: [Version] - [Purpose]

**Key Dependencies**:

- [Dependency 1]: [Version] - [Purpose]
- [Dependency 2]: [Version] - [Purpose]

---

## Knowledge Shards Organization

Knowledge shards are modular, embeddable pieces of domain knowledge:

```yaml
shard_schema:
    language: '[programming_language]'
    version: '[version]'
    shards:
        - id: '[topic.subtopic]'
          topics: [list, of, topics]
          tokens: [estimated_tokens]
          tier: [1|2|3]
```

### Available Shards

[List project-specific knowledge shards]

1. **[topic.subtopic]**
    - Topics: [list topics]
    - Tier: [1|2|3]
    - Tokens: ~[number]

---

## Domain Glossary

| Term     | Definition   |
| -------- | ------------ |
| [Term 1] | [Definition] |
| [Term 2] | [Definition] |
| [Term 3] | [Definition] |

---

## External References

### Documentation Links

- [Official Docs Title](URL)
- [API Reference](URL)
- [Framework Guide](URL)

### Related Resources

- [Resource 1](URL) - [Description]
- [Resource 2](URL) - [Description]

---

## Retrieval Guidelines

**For AI Systems**:

1. Start with Tier 1 (nano) shards for syntax
2. Progress to Tier 2 (micro) for patterns
3. Request Tier 3 (full) only when needed
4. Use semantic search with confidence threshold ≥0.85

**Escalation Protocol**:

- If confidence < 0.85: Request clarification or additional context
- If confidence ≥ 0.70 and < 0.85: Merge top 2 shards
- If confidence < 0.70: Escalate to Tier 3 or request human input

---

_This document is part of the `.context/` directory following TELIS methodology - use RAG (Retrieval Augmented Generation) techniques to select and inject relevant portions dynamically._
