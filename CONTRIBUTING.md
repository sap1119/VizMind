# Contributing to VizMind Analytics

Thank you for your interest in contributing to VizMind! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account for database testing

### Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/yourusername/vizmind-analytics.git
cd vizmind-analytics
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Configure your Supabase credentials
```

4. **Start Development**
```bash
npm run dev
```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Implement responsive design
- Add proper error handling
- Include loading states

### Component Structure
```typescript
// Component template
import React from 'react';
import { Icon } from 'lucide-react';

interface ComponentProps {
  // Define props with TypeScript
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Component logic
  
  return (
    <div className="responsive-classes dark:dark-classes">
      {/* Component JSX */}
    </div>
  );
};
```

### File Organization
- Components in `/src/components/`
- Contexts in `/src/contexts/`
- Types in `/src/types/`
- Utils in `/src/utils/`
- One component per file
- Use descriptive file names

## 🎯 Contribution Areas

### High Priority
- [ ] Additional chart types
- [ ] Advanced analytics features
- [ ] Performance optimizations
- [ ] Mobile responsiveness improvements
- [ ] Accessibility enhancements

### Medium Priority
- [ ] Additional data export formats
- [ ] More dashboard widgets
- [ ] Enhanced KPI calculations
- [ ] Portfolio analysis features
- [ ] User onboarding improvements

### Low Priority
- [ ] Additional themes
- [ ] Keyboard shortcuts
- [ ] Advanced settings
- [ ] Integration features
- [ ] Documentation improvements

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Detailed steps
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - Browser, OS, device
6. **Screenshots** - If applicable

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment:**
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 12]
- Device: [e.g. Desktop]
```

## ✨ Feature Requests

For feature requests, please include:

1. **Problem Statement** - What problem does this solve?
2. **Proposed Solution** - How should it work?
3. **Alternatives** - Other solutions considered
4. **Use Cases** - When would this be used?
5. **Priority** - How important is this?

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console.log statements
- [ ] Responsive design implemented
- [ ] Dark mode support added
- [ ] TypeScript types defined

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Responsive design verified
- [ ] Dark mode tested
- [ ] Error handling tested

## Screenshots
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] TypeScript types added
- [ ] Responsive design implemented
```

### Review Process
1. **Automated Checks** - Linting and type checking
2. **Code Review** - Maintainer review
3. **Testing** - Manual testing if needed
4. **Merge** - Squash and merge

## 🏗️ Architecture Guidelines

### State Management
- Use React Context for global state
- Local state for component-specific data
- Supabase for persistent data
- Real-time subscriptions where appropriate

### Error Handling
```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  toast.error('User-friendly error message');
}
```

### Loading States
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    // Async operation
  } finally {
    setLoading(false);
  }
};
```

### Responsive Design
```typescript
// Use Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

## 🎨 Design Guidelines

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Headings: Font weight 600-700
- Body: Font weight 400
- Emphasis: Font weight 500

### Spacing
- Use Tailwind spacing scale
- Consistent padding/margins
- 8px base unit

### Dark Mode
- Always implement dark mode variants
- Use `dark:` prefix for dark styles
- Test in both themes

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

## 🤝 Community

### Communication
- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Discord for real-time chat

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Community highlights

Thank you for contributing to VizMind Analytics! 🚀