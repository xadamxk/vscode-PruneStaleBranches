import * as vscode from "vscode";
import { Commands, EXTENSION_NAME } from "../constants";
import RegisteredCommands from "../commands";
import { getStaleLocalBranches, pruneStaleRemoteBranches } from "./git";

export const initializeExtension = async (context: vscode.ExtensionContext) => {
  const extensionConfiguration =
    vscode.workspace.getConfiguration(EXTENSION_NAME);

  const statusBar: vscode.StatusBarItem = await initializeStatusBar(
    context,
    extensionConfiguration,
    Commands.PRUNE_STALE_BRANCHES
  );
  initializeCommands(context, statusBar);
};

const initializeCommands = (
  context: vscode.ExtensionContext,
  statusBar: vscode.StatusBarItem
): void => {
  RegisteredCommands.forEach((command) => {
    context.subscriptions.push(command(statusBar));
  });
};

const initializeStatusBar = async (
  context: vscode.ExtensionContext,
  extensionConfiguration: vscode.WorkspaceConfiguration,
  command: Commands
): Promise<vscode.StatusBarItem> => {
  // TODO: Add a configuration option to customize the status bar priority
  const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  // Only render the status bar item if the workspace is available and there are stale branches
  if (vscode.workspace.workspaceFolders) {
    const workSpaceUri = vscode.workspace.workspaceFolders[0].uri.fsPath;
    await pruneStaleRemoteBranches(workSpaceUri);
    const branches = await getStaleLocalBranches(workSpaceUri);
    const staleBranchCount = branches.length;
    if (staleBranchCount > 0) {
      statusBarItem.text = `${staleBranchCount} $(list-tree)`;
      statusBarItem.command = command;
      statusBarItem.tooltip = "Prune stale branches";
      statusBarItem.show();
    } else {
      statusBarItem.text = "";
      statusBarItem.hide();
    }
  }
  return statusBarItem;
};
