# eslint-plugin-a11y-extended

Advanced accessibility (a11y) checks for JSX/TSX — including support for custom components, localization, and real-world issues not covered by standard plugins.

## Features

- Validate `aria-label` presence on buttons and custom components
- Check that `aria-labelledby` references existing elements
- Ensure `role="button"` elements are focusable and keyboard-accessible
- Detect hardcoded accessibility text (e.g., `aria-label="Close"`) and recommend localization
- Enforce `alt` or `role="presentation"` on `<img>` elements

## Installation

```bash
npm install eslint-plugin-a11y-extended --save-dev
```

> ⚠️ This plugin requires ESLint and `@typescript-eslint/parser`.

## 🔧 Usage

In your ESLint config (ESLint v9+):

```js
import plugin from 'eslint-plugin-a11y-extended';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser },
    plugins: {
      'a11y-extended': plugin,
    },
    rules: {
      'a11y-extended/require-aria-label': 'warn',
      'a11y-extended/no-missing-aria-labelledby-target': 'warn',
      'a11y-extended/interactive-supports-focus-and-keys': 'warn',
      'a11y-extended/no-hardcoded-accessibility-text': 'warn',
      'a11y-extended/img-requires-alt-or-role': 'warn',
    },
  },
];
```

## ✅ Example Rules

### ✅ `require-aria-label`

```tsx
// ❌ Bad
<button />

// ✅ Good
<button aria-label="Submit" />
```

---

### ✅ `no-missing-aria-labelledby-target`

```tsx
// ❌ Bad
<div aria-labelledby="missing-id" />

// ✅ Good
<h2 id="heading">Title</h2>
<div aria-labelledby="heading" />
```

---

### ✅ `interactive-supports-focus-and-keys`

```tsx
// ❌ Bad
<div role="button" />

// ✅ Good
<div role="button" tabIndex={0} onKeyDown={() => {}} />
```

---

### ✅ `no-hardcoded-accessibility-text`

```tsx
// ❌ Bad
<button aria-label="Close" />

// ✅ Good
<button aria-label={t('close')} />
```

---

### ✅ `img-requires-alt-or-role`

```tsx
// ❌ Bad
<img />

// ✅ Good
<img alt="Logo" />
<img role="presentation" />
```

---

## Testing

This plugin is tested with `jest` and `@typescript-eslint/utils.RuleTester`.

To run tests:

```bash
npm install
npm test
```

---

## Why this plugin?

While `eslint-plugin-jsx-a11y` covers many common issues, it lacks support for project-specific components, localization, and behavioral accessibility. This plugin is meant to bridge that gap in real-world, production React/TypeScript projects.

---

## Contributing

Created by **Mariia Parfeniuk**  
Feel free to open issues or PRs! Suggestions for new rules are welcome.
