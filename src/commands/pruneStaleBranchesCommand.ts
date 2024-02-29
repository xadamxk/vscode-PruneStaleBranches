import * as vscode from "vscode";
import { Commands } from "../constants";
import { getStaleLocalBranches, deleteLocalBranches } from "../core/git";

export const pruneStaleBranchesCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.PRUNE_STALE_BRANCHES,
    async (cmdArgs: vscode.Uri, multiselection: Array<vscode.Uri>) => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        const workSpaceUri = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const branches = await getStaleLocalBranches(workSpaceUri);
        const result = await deleteLocalBranches(workSpaceUri, branches);

        // TODO: update status bar item
        return result;
      }
    }
  );
};
