import { TSESLint } from '@typescript-eslint/utils';
import { noHardcodedAccessibilityTextRule } from '../src/rules/no-hardcoded-accessibility-text';

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

ruleTester.run('no-hardcoded-accessibility-text', noHardcodedAccessibilityTextRule, {
  valid: [
    { code: `<button aria-label={t('close')} />` },
    { code: `<img alt={t('userAvatar')} />` },
    { code: `<span title={t('tooltip')} />` },
  ],
  invalid: [
    {
      code: `<button aria-label="Close" />`,
      errors: [{ messageId: 'hardcoded', data: { attr: 'aria-label' } }],
    },
    {
      code: `<img alt="User avatar" />`,
      errors: [{ messageId: 'hardcoded', data: { attr: 'alt' } }],
    },
    {
      code: `<span title="info" />`,
      errors: [{ messageId: 'hardcoded', data: { attr: 'title' } }],
    },
    {
      code: `<span aria-label={someVar} />`,
      errors: [{ messageId: 'hardcoded', data: { attr: 'aria-label' } }],
    },
    {
      code: `<span aria-label={getLabel()} />`,
      errors: [{ messageId: 'hardcoded', data: { attr: 'aria-label' } }],
    },
  ],
});
