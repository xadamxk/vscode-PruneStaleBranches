import * as vscode from "vscode";
import { Commands } from "../constants";
import { getStaleLocalBranches } from "../core/git";

export const previewStaleBranchesCommand = (
  statusBarItem: vscode.StatusBarItem
): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.PREVIEW_STALE_BRANCHES,
    async (cmdArgs: vscode.Uri, multiselection: Array<vscode.Uri>) => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        const workSpaceUri = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const branches = await getStaleLocalBranches(workSpaceUri);

        if (branches.length > 0 || true) {
          vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              title: branches.length + " stale branches found",
              cancellable: true,
            },
            async (progress, token) => {
              progress.report({ increment: 0 });
              const sleep = (ms: number) =>
                new Promise((resolve) => setTimeout(resolve, ms));
              // Dismiss in 5 seconds (50 * 100ms)
              for (let i = 0; i < 50; i++) {
                await sleep(100);
                progress.report({ increment: 2 });
              }
            }
          );
        }
        return branches.length;
      }
    }
  );
};
