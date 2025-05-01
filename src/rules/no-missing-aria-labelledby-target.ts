import { TSESLint, TSESTree } from '@typescript-eslint/utils';

export const noMissingAriaLabelledbyTargetRule: TSESLint.RuleModule<'missingTarget', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure aria-labelledby references existing id in the same component',
    },
    messages: {
      missingTarget: 'aria-labelledby references a non-existent id "{{id}}"',
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    const definedIds = new Set<string>();
    const usedRefs: { node: TSESTree.JSXAttribute; id: string }[] = [];

    return {
      JSXAttribute(node) {
        if (
          node.name.name === 'id' &&
          node.value?.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          definedIds.add(node.value.value);
        }

        if (
          node.name.name === 'aria-labelledby' &&
          node.value?.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          const id = node.value.value;
          usedRefs.push({ node, id });
        }
      },

      'Program:exit'() {
        for (const ref of usedRefs) {
          if (!definedIds.has(ref.id)) {
            context.report({
              node: ref.node,
              messageId: 'missingTarget',
              data: { id: ref.id },
            });
          }
        }
      },
    };
  },
};
