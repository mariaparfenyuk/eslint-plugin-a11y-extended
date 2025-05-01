import { TSESLint } from '@typescript-eslint/utils';
import { requireAriaLabelRule } from '../src/rules/require-aria-label';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('require-aria-label', requireAriaLabelRule, {
  valid: [
    {
      code: '<button aria-label="Submit" />',
    },
  ],
  invalid: [
    {
      code: '<button />',
      errors: [{ messageId: 'missingAria' }],
    },
  ],
});
