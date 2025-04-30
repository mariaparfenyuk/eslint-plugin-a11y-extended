import { TSESLint } from '@typescript-eslint/utils';

export const requireAriaLabelRule: TSESLint.RuleModule<'missingAria', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure button has aria-label or visible text',
    },
    messages: {
      missingAria: 'Button must have aria-label or accessible text.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type === 'JSXIdentifier' && node.name.name === 'button') {
          const hasAria = node.attributes.some(
            attr =>
              attr.type === 'JSXAttribute' &&
              attr.name.name === 'aria-label' &&
              attr.value != null
          );

          if (!hasAria) {
            context.report({
              node,
              messageId: 'missingAria',
            });
          }
        }
      },
    };
  },
};
