import { TSESLint } from '@typescript-eslint/utils';
import { interactiveSupportsFocusAndKeysRule } from '../src/rules/interactive-supports-focus-and-keys';

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

ruleTester.run('interactive-supports-focus-and-keys', interactiveSupportsFocusAndKeysRule, {
  valid: [
    {
      code: `<div role="button" tabIndex={0} onKeyDown={() => {}} />`,
    },
    {
      code: `<div role="button" tabIndex={1} onKeyPress={() => {}} />`,
    },
  ],
  invalid: [
    {
      code: `<div role="button" />`,
      errors: [{ messageId: 'missingHandlers' }],
    },
    {
      code: `<div role="button" tabIndex={0} />`,
      errors: [{ messageId: 'missingHandlers' }],
    },
    {
      code: `<div role="button" onKeyDown={() => {}} />`,
      errors: [{ messageId: 'missingHandlers' }],
    },
  ],
});
