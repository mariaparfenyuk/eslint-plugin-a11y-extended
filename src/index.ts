import { requireAriaLabelRule } from './rules/require-aria-label.js';
import { noMissingAriaLabelledbyTargetRule } from './rules/no-missing-aria-labelledby-target.js';

export const rules = {
  'require-aria-label': requireAriaLabelRule,
  'no-missing-aria-labelledby-target': noMissingAriaLabelledbyTargetRule,
};