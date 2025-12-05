# Pull Request Template

## Description

<!-- Provide a clear and concise description of your changes -->

### What does this PR do?

<!-- Explain the changes and why they were needed -->

### Related Issues

<!-- Link related issues using keywords: Closes #123, Fixes #456, Relates to #789 -->

Closes #

---

## Type of Change

<!-- Mark relevant options with an [x] -->

- [ ] 🎨 `feat`: New feature
- [ ] 🐛 `fix`: Bug fix
- [ ] 📚 `docs`: Documentation update
- [ ] 🎭 `style`: Code style/formatting
- [ ] ♻️ `refactor`: Code restructuring
- [ ] ⚡ `perf`: Performance improvement
- [ ] ✅ `test`: Adding or updating tests
- [ ] 🔧 `chore`: Maintenance tasks
- [ ] 🚀 `ci`: CI/CD changes
- [ ] 📦 `build`: Build system changes

---

## Checklist

### Before Creating PR

- [ ] Code follows project style guidelines (`.editorconfig`, linting rules)
- [ ] All commits follow [Conventional Commits](../.workflows/git-workflow.md) format
- [ ] Self-reviewed code for obvious issues
- [ ] Added/updated tests for changes
- [ ] All tests pass locally (`npm test`)
- [ ] Test coverage maintained at ≥85%
- [ ] No linting errors (`npm run lint`)
- [ ] Code is properly formatted (`npm run format`)
- [ ] Documentation updated (if applicable)

### Code Quality

- [ ] No console.log or debugging code left in
- [ ] No commented-out code
- [ ] No TODO comments (create issues instead)
- [ ] Error handling is appropriate
- [ ] No security vulnerabilities introduced
- [ ] Performance impact considered

### Testing

- [ ] **Unit tests** added/updated
- [ ] **Integration tests** added/updated (if applicable)
- [ ] **E2E tests** added/updated (if critical user flow)
- [ ] All tests are deterministic (no flaky tests)
- [ ] Test coverage: **\_\_\_%** (must be ≥85%)

### Documentation

- [ ] README updated (if applicable)
- [ ] API documentation updated (if applicable)
- [ ] Inline code comments added for complex logic
- [ ] CHANGELOG.md updated (if applicable)

---

## Screenshots/Videos

<!-- If UI changes, add screenshots or videos -->

### Before

<!-- Screenshot or description of current state -->

### After

<!-- Screenshot or description of new state -->

---

## Breaking Changes

<!-- List any breaking changes and migration steps if applicable -->

- [ ] No breaking changes
- [ ] Breaking changes documented below

### Breaking Changes Details

<!-- Describe breaking changes and how to migrate -->

---

## Performance Impact

<!-- Describe any performance implications -->

- [ ] No performance impact
- [ ] Performance improved
- [ ] Performance degraded (explain why acceptable)

**Details**:

<!-- Benchmarks, metrics, or explanation -->

---

## Deployment Notes

<!-- Any special deployment considerations? -->

- [ ] No special deployment steps needed
- [ ] Database migrations required
- [ ] Environment variables added/changed
- [ ] Configuration changes needed
- [ ] Secrets/credentials need updating

### Deployment Steps

<!-- List any special steps required for deployment -->

---

## Reviewer Notes

<!-- Anything specific reviewers should focus on? -->

### Areas of Concern

<!-- Highlight areas you'd like extra scrutiny on -->

### Testing Instructions

<!-- How should reviewers test this? -->

1.
2.
3.

---

## Post-Merge Tasks

<!-- Tasks to complete after merging -->

- [ ] Update related documentation
- [ ] Notify stakeholders
- [ ] Monitor error logs
- [ ] Update project board
- [ ] Create follow-up issues

---

## Additional Context

<!-- Any other context, references, or information -->

---

**Quality Gates** (auto-checked by CI):

- ✅ Linting passed
- ✅ Type checking passed
- ✅ Unit tests passed
- ✅ Integration tests passed
- ✅ E2E tests passed (non-draft PRs)
- ✅ Coverage ≥85%
- ✅ Build successful

<!--
Thank you for your contribution!
Please ensure all checklist items are completed before requesting review.
-->
