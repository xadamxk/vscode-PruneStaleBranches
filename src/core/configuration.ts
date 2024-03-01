import { StatusBarAlignment } from "vscode";

/**
 * Configuration keys for the extension - must match the keys in package.json
 */
export const ExtensionConfiguration = {
  StatusBarEnabled: "statusBar.enabled",
  StatusBarAlignment: "statusBar.alignment",
};

/**
 * Determines the status bar alignment to use based on the configuration value.
 * Status bar alignment: https://code.visualstudio.com/api/references/vscode-api#StatusBarAlignment
 */
export const determineStatusBarAlignment = (alignment: string | undefined) => {
  switch (alignment) {
    default:
    case "left":
      return StatusBarAlignment.Left;
    case "right":
      return StatusBarAlignment.Right;
  }
};
