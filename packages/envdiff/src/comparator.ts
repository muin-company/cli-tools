/**
 * Comparator for environment files
 */

import { EnvFile, Difference, DiffType, ComparisonResult, CompareOptions } from './types';

/**
 * Compare two environment files
 */
export function compareEnvFiles(
  left: EnvFile,
  right: EnvFile,
  options: CompareOptions = {}
): ComparisonResult {
  const differences: Difference[] = [];
  const leftKeys = new Set(left.variables.keys());
  const rightKeys = new Set(right.variables.keys());
  const allKeys = new Set([...leftKeys, ...rightKeys]);

  let added = 0;
  let removed = 0;
  let modified = 0;
  let unchanged = 0;

  allKeys.forEach(key => {
    const leftVar = left.variables.get(key);
    const rightVar = right.variables.get(key);

    if (!leftVar && rightVar) {
      // Added in right
      differences.push({
        key,
        type: DiffType.ADDED,
        rightValue: rightVar.value,
        rightLine: rightVar.line,
      });
      added++;
    } else if (leftVar && !rightVar) {
      // Removed in right
      differences.push({
        key,
        type: DiffType.REMOVED,
        leftValue: leftVar.value,
        leftLine: leftVar.line,
      });
      removed++;
    } else if (leftVar && rightVar) {
      if (options.keysOnly || leftVar.value === rightVar.value) {
        // Unchanged
        differences.push({
          key,
          type: DiffType.UNCHANGED,
          leftValue: leftVar.value,
          rightValue: rightVar.value,
          leftLine: leftVar.line,
          rightLine: rightVar.line,
        });
        unchanged++;
      } else {
        // Modified
        differences.push({
          key,
          type: DiffType.MODIFIED,
          leftValue: leftVar.value,
          rightValue: rightVar.value,
          leftLine: leftVar.line,
          rightLine: rightVar.line,
        });
        modified++;
      }
    }
  });

  // Sort differences: removed, modified, added, unchanged
  const order = {
    [DiffType.REMOVED]: 1,
    [DiffType.MODIFIED]: 2,
    [DiffType.ADDED]: 3,
    [DiffType.UNCHANGED]: 4,
  };

  differences.sort((a, b) => {
    const orderDiff = order[a.type] - order[b.type];
    if (orderDiff !== 0) return orderDiff;
    return a.key.localeCompare(b.key);
  });

  return {
    left,
    right,
    differences,
    summary: {
      total: allKeys.size,
      added,
      removed,
      modified,
      unchanged,
    },
  };
}
