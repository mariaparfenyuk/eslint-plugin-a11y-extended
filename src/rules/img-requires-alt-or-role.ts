import { TSESLint } from '@typescript-eslint/utils';

export const imgRequiresAltOrRoleRule: TSESLint.RuleModule<'missingAltOrRole', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'img elements must have alt or role="presentation"',
    },
    messages: {
      missingAltOrRole: 'img must have alt attribute or role="presentation".',
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;
        if (node.name.name !== 'img') return;

        const hasAlt = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'alt'
        );

        const hasRolePresentation = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'role' &&
            attr.value?.type === 'Literal' &&
            attr.value.value === 'presentation'
        );

        if (!hasAlt && !hasRolePresentation) {
          context.report({
            node,
            messageId: 'missingAltOrRole',
          });
        }
      },
    };
  },
};
