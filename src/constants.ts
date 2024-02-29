/**
 * Used to identify the extension - must match the name in package.json
 */
export const EXTENSION_NAME = "prune-stale-branches";

/**
 * Commands that can be executed by the extension - must match the command names in package.json
 */
export const enum Commands {
  PREVIEW_STALE_BRANCHES = `${EXTENSION_NAME}.previewStaleBranchesCommand`,
  PRUNE_STALE_BRANCHES = `${EXTENSION_NAME}.pruneStaleBranchesCommand`,
}
