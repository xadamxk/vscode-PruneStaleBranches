import * as vscode from "vscode";

import { previewStaleBranchesCommand } from "./previewStaleBranchesCommand";
import { pruneStaleBranchesCommand } from "./pruneStaleBranchesCommand";

const RegisteredCommands: ((
  statusBarItem: vscode.StatusBarItem
) => vscode.Disposable)[] = [
  previewStaleBranchesCommand,
  pruneStaleBranchesCommand,
];
export default RegisteredCommands;
