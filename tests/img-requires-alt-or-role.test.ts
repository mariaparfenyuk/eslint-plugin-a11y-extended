import { TSESLint } from '@typescript-eslint/utils';
import { imgRequiresAltOrRoleRule } from '../src/rules/img-requires-alt-or-role';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('img-requires-alt-or-role', imgRequiresAltOrRoleRule, {
  valid: [
    { code: `<img alt="Logo" />` },
    { code: `<img role="presentation" />` },
  ],
  invalid: [
    {
      code: `<img />`,
      errors: [{ messageId: 'missingAltOrRole' }],
    },
    {
      code: `<img width="100" height="100" />`,
      errors: [{ messageId: 'missingAltOrRole' }],
    },
  ],
});
