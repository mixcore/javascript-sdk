# @mixcore/template

Template rendering services for Mixcore SDK. Provides utilities for dynamic content generation from templates.

## Features

- Multiple template engines (Handlebars, EJS, etc.)
- Layout and partial support
- Custom template helpers
- Async rendering
- Framework-agnostic implementation

## Installation

```bash
npm install @mixcore/template
# or
pnpm add @mixcore/template
```

## Usage

### Basic Example

```typescript
import { TemplateService } from '@mixcore/template';

const templateService = new TemplateService();

// Render template with data
const html = await templateService.render('welcome', {
  name: 'User',
  date: new Date()
});
```

### Custom Helpers

```typescript
templateService.registerHelper('formatDate', (date) => {
  return new Intl.DateTimeFormat().format(date);
});
```

### Supported Template Types

- Handlebars (.hbs)
- EJS (.ejs)
- HTML with embedded expressions
- Plain text templates

## API Reference

| Method | Description |
|--------|-------------|
| `render(template, data)` | Renders template with data |
| `registerHelper(name, fn)` | Adds custom helper |
| `getTemplate(name)` | Gets compiled template |
| `precompile(templates)` | Precompiles for performance |

## Framework Integration

This package works with all JavaScript frameworks. See the [main README](../../README.md#framework-integration) for framework-specific integration examples.

### Package-specific Usage

```typescript
// Example: Using with SvelteKit
import { TemplateService } from '@mixcore/template';

const templateService = new TemplateService();

// Render template in Svelte component
$: rendered = templateService.render('welcome', {
  name: 'User',
  date: new Date()
});
```

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client integration
- [@mixcore/file](https://github.com/mixcore/javascript-sdk/tree/main/packages/file): File handling for templates

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
