import * as vscode from "vscode";
import { Commands } from "../constants";
import { getBranches } from "../core/git";

export const previewStaleBranchesCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.PREVIEW_STALE_BRANCHES,
    async (cmdArgs: vscode.Uri, multiselection: Array<vscode.Uri>) => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        //
        const workSpaceUri = vscode.workspace.workspaceFolders[0].uri.fsPath;
        // const projectPath = workSpaceUri.path;
        const branches = await getBranches(workSpaceUri);
      }
    }
  );
};
