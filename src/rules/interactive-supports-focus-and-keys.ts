import { TSESLint, TSESTree } from '@typescript-eslint/utils';

export const interactiveSupportsFocusAndKeysRule: TSESLint.RuleModule<'missingHandlers', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Elements with role="button" must be focusable and keyboard-accessible',
    },
    messages: {
      missingHandlers: 'Element with role="button" must have tabIndex ≥ 0 and onKeyDown or onKeyPress.',
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;

        const hasRoleButton = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'role' &&
            attr.value?.type === 'Literal' &&
            attr.value.value === 'button'
        );

        if (!hasRoleButton) return;

        const hasOnKeyDownOrPress = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            (attr.name.name === 'onKeyDown' || attr.name.name === 'onKeyPress')
        );

        const hasValidTabIndex = node.attributes.some((attr) => {
          if (
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'tabIndex' &&
            attr.value
          ) {
            if (
              attr.value.type === 'JSXExpressionContainer' &&
              attr.value.expression.type === 'Literal' &&
              typeof attr.value.expression.value === 'number'
            ) {
              return attr.value.expression.value >= 0;
            }
        
            if (
              attr.value.type === 'Literal' &&
              typeof attr.value.value === 'string' &&
              Number(attr.value.value) >= 0
            ) {
              return true;
            }
          }
        
          return false;
        });
        

        if (!hasOnKeyDownOrPress || !hasValidTabIndex) {
          context.report({
            node,
            messageId: 'missingHandlers',
          });
        }
      },
    };
  },
};
