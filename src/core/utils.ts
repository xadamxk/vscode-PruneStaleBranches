import * as vscode from "vscode";
import { Commands, EXTENSION_NAME } from "../constants";
import RegisteredCommands from "../commands";

export const initializeExtension = (context: vscode.ExtensionContext) => {
  const extensionConfiguration =
    vscode.workspace.getConfiguration(EXTENSION_NAME);

  initializeCommands(context);

  const statusBar = initializeStatusBar(context, extensionConfiguration);
};

const initializeCommands = (context: vscode.ExtensionContext): void => {
  RegisteredCommands.forEach((command) => {
    context.subscriptions.push(command());
  });
};

const initializeStatusBar = (
  context: vscode.ExtensionContext,
  extensionConfiguration: vscode.WorkspaceConfiguration,
  command = Commands.PREVIEW_STALE_BRANCHES
): vscode.StatusBarItem => {
  const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "$(list-tree) Stale Branches";
  statusBarItem.command = command;
  statusBarItem.tooltip = "Preview stale branches";
  statusBarItem.show();
  return statusBarItem;
};
