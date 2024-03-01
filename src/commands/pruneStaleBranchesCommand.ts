import * as vscode from "vscode";
import { Commands } from "../constants";
import { getStaleLocalBranches, deleteLocalBranches } from "../core/git";

export const pruneStaleBranchesCommand = (
  statusBarItem: vscode.StatusBarItem
): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.PRUNE_STALE_BRANCHES,
    async () => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        const workSpaceUri = vscode.workspace.workspaceFolders[0].uri.fsPath;

        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Pruining stale branches...",
            cancellable: false,
          },
          async (progress, token) => {
            try {
              progress.report({ increment: 25 });
              const branches = await getStaleLocalBranches(workSpaceUri);
              progress.report({ increment: 25 });
              const result = await deleteLocalBranches(workSpaceUri, branches);
              progress.report({ increment: 50 });

              if (branches.length > 0) {
                statusBarItem.text = "";
                statusBarItem.hide();
                vscode.window.showInformationMessage(
                  `Stale branches pruned: ${branches.length}`
                );
              }
              return result;
            } catch (err) {
              progress.report({ increment: 100 });
              throw err;
            }
          }
        );
      }
    }
  );
};
