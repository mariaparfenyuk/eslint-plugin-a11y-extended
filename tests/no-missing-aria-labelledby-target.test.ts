import { TSESLint } from '@typescript-eslint/utils';
import { noMissingAriaLabelledbyTargetRule } from '../src/rules/no-missing-aria-labelledby-target';

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
ruleTester.run('no-missing-aria-labelledby-target', noMissingAriaLabelledbyTargetRule, {
  valid: [
    {
      code: `
        const Example = () => (
          <>
            <h2 id="title">Title</h2>
            <div aria-labelledby="title" />
          </>
        );
      `,
    },
  ],
  invalid: [
    {
      code: `
        const Example = () => (
          <div aria-labelledby="nonexistent" />
        );
      `,
      errors: [{ messageId: 'missingTarget', data: { id: 'nonexistent' } }],
    },
  ],
});