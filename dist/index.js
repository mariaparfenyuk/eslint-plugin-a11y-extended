import { requireAriaLabelRule } from './rules/require-aria-label.js';
import { noMissingAriaLabelledbyTargetRule } from './rules/no-missing-aria-labelledby-target.js';
import { noHardcodedAccessibilityTextRule } from './rules/no-hardcoded-accessibility-text.js';
import { imgRequiresAltOrRoleRule } from './rules/img-requires-alt-or-role.js';
import { interactiveSupportsFocusAndKeysRule } from './rules/interactive-supports-focus-and-keys.js';
export const rules = {
    'require-aria-label': requireAriaLabelRule,
    'no-missing-aria-labelledby-target': noMissingAriaLabelledbyTargetRule,
    'no-hardcoded-accessibility-text': noHardcodedAccessibilityTextRule,
    'img-requires-alt-or-role': imgRequiresAltOrRoleRule,
    'interactive-supports-focus-and-keys': interactiveSupportsFocusAndKeysRule,
};
