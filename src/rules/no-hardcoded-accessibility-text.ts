import { TSESLint } from '@typescript-eslint/utils';

export const noHardcodedAccessibilityTextRule: TSESLint.RuleModule<'hardcoded', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Accessibility-related attributes (aria-label, alt, title) should use i18n function (e.g., t())',
    },
    messages: {
      hardcoded: '"{{attr}}" should not contain hardcoded strings. Use i18n function like t().',
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    const ATTRIBUTES_TO_CHECK = ['aria-label', 'alt', 'title'];

    return {
      JSXAttribute(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          !ATTRIBUTES_TO_CHECK.includes(node.name.name)
        ) return;

        const attrName = node.name.name;

        if (!node.value) return;

        if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
          context.report({
            node,
            messageId: 'hardcoded',
            data: { attr: attrName },
          });
        }

        // aria-label={...}
        if (
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type !== 'CallExpression'
        ) {
          context.report({
            node,
            messageId: 'hardcoded',
            data: { attr: attrName },
          });
        }

        if (
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'CallExpression'
        ) {
          const callee = node.value.expression.callee;
          if (callee.type !== 'Identifier' || callee.name !== 't') {
            context.report({
              node,
              messageId: 'hardcoded',
              data: { attr: attrName },
            });
          }
        }
      },
    };
  },
};
