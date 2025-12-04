# Example Component Template

## Component Information
- **Name**: [ComponentName]
- **Type**: [Function|Class]
- **Purpose**: [Brief description of what this component does]
- **Author**: [Your name]
- **Date**: [YYYY-MM-DD]

---

## Template (JavaScript/React Example)

```javascript
/**
 * [ComponentName] - [Brief description]
 * 
 * @param {Object} props - Component properties
 * @param {[Type]} props.[propName] - [Description]
 * @returns {JSX.Element} [Description of what is rendered]
 */
export function ComponentName({ propName }) {
  // State management
  const [state, setState] = useState(initialValue);

  // Effects
  useEffect(() => {
    // Side effects here
    
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // Event handlers
  const handleEvent = (event) => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
}

ComponentName.propTypes = {
  propName: PropTypes.[type].isRequired,
};

ComponentName.defaultProps = {
  propName: defaultValue,
};

export default ComponentName;
```

---

## Instructions for Use

1. Replace `[ComponentName]` with your actual component name (PascalCase)
2. Update the documentation with actual prop types and descriptions
3. Implement your component logic
4. Add tests in `tests/unit/components/[ComponentName].test.js`
5. Update relevant imports in parent components

---

## Customization Options

### For Class Components
```javascript
class ComponentName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initial state
    };
  }

  componentDidMount() {
    // Lifecycle method
  }

  render() {
    return (
      <div className="component-name">
        {/* Component JSX */}
      </div>
    );
  }
}
```

### For TypeScript
```typescript
interface ComponentNameProps {
  propName: PropType;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ propName }) => {
  // Component implementation
  return <div className="component-name">{/* JSX */}</div>;
};
```

---

*This is a template file. Copy and customize for your specific needs.*
