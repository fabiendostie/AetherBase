# Example Test Template

## Test Information
- **Test Suite**: [ModuleName] Tests
- **Type**: [Unit|Integration|E2E]
- **Framework**: [Jest|Mocha|Pytest|etc.]
- **Coverage Target**: [Percentage]%

---

## Template (Jest Example)

```javascript
/**
 * Test suite for [ModuleName]
 */

import { functionToTest, ClassToTest } from '../src/[module]';

describe('[ModuleName]', () => {
  // Setup
  beforeAll(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
  });

  afterEach(() => {
    // Runs after each test
  });

  afterAll(() => {
    // Runs once after all tests
  });

  describe('[Feature/Function Name]', () => {
    it('should [expected behavior]', () => {
      // Arrange
      const input = [test data];
      const expected = [expected result];

      // Act
      const result = functionToTest(input);

      // Assert
      expect(result).toBe(expected);
    });

    it('should handle edge case: [description]', () => {
      // Test edge case
      const edgeCase = [edge case data];
      expect(() => functionToTest(edgeCase)).toThrow();
    });

    it('should handle error: [error description]', () => {
      // Test error handling
      const invalidInput = [invalid data];
      expect(() => functionToTest(invalidInput)).toThrow('[ErrorType]');
    });
  });

  describe('[Another Feature]', () => {
    it('should [expected behavior]', async () => {
      // For async tests
      const result = await asyncFunction();
      expect(result).toEqual(expected);
    });
  });
});
```

---

## Template (Pytest Example)

```python
"""
Test suite for [ModuleName]
"""

import pytest
from src.module import function_to_test, ClassToTest


class Test[ClassName]:
    """Test cases for [ClassName]"""
    
    @pytest.fixture
    def setup_data(self):
        """Fixture for test data"""
        return {
            'input': 'test data',
            'expected': 'expected result'
        }
    
    def test_[feature_name](self, setup_data):
        """Test [expected behavior]"""
        # Arrange
        input_data = setup_data['input']
        expected = setup_data['expected']
        
        # Act
        result = function_to_test(input_data)
        
        # Assert
        assert result == expected
    
    def test_edge_case_[description](self):
        """Test edge case: [description]"""
        edge_case = [edge case data]
        with pytest.raises([ExceptionType]):
            function_to_test(edge_case)
    
    @pytest.mark.parametrize("input,expected", [
        ([input1], [expected1]),
        ([input2], [expected2]),
        ([input3], [expected3]),
    ])
    def test_multiple_cases(self, input, expected):
        """Test multiple cases with parameterization"""
        assert function_to_test(input) == expected


@pytest.mark.asyncio
async def test_async_function():
    """Test async function"""
    result = await async_function()
    assert result is not None
```

---

## Test Coverage Guidelines

### What to Test
- ✅ Happy path (expected use cases)
- ✅ Edge cases (boundary conditions)
- ✅ Error handling (invalid inputs)
- ✅ Integration points (dependencies)
- ✅ State changes (before/after)

### What NOT to Test
- ❌ Third-party library internals
- ❌ Getters/setters (unless they have logic)
- ❌ Framework code
- ❌ Private methods (test through public API)

---

## Naming Conventions

### Test Function Names
```
test_[feature]_[scenario]_[expected_result]

Examples:
- test_login_valid_credentials_returns_token
- test_calculate_total_empty_cart_returns_zero
- test_upload_file_exceeds_limit_throws_error
```

### Test File Names
```
[module_name].test.[ext]
or
test_[module_name].[ext]

Examples:
- userService.test.js
- test_user_service.py
```

---

## Mocking Examples

### Jest
```javascript
jest.mock('../src/api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'mocked' }))
}));

it('should use mocked API', async () => {
  const result = await serviceUsingAPI();
  expect(mockAPI).toHaveBeenCalledWith(expectedParams);
});
```

### Pytest
```python
from unittest.mock import Mock, patch

@patch('module.external_service')
def test_with_mock(mock_service):
    mock_service.return_value = 'mocked response'
    result = function_using_service()
    assert result == 'expected'
```

---

## Instructions for Use

1. Copy this template to your test directory
2. Replace `[ModuleName]` with the module being tested
3. Rename file following convention: `[module].test.[ext]`
4. Implement test cases for all public methods
5. Run tests: `npm test` or `pytest`
6. Check coverage: `npm run test:coverage` or `pytest --cov`

---

*This is a template file. Customize based on your testing framework and requirements.*
