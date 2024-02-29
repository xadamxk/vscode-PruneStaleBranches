import * as vscode from "vscode";

import { previewStaleBranchesCommand } from "./previewStaleBranchesCommand";
import { pruneStaleBranchesCommand } from "./pruneStaleBranchesCommand";

const RegisteredCommands: (() => vscode.Disposable)[] = [
  previewStaleBranchesCommand,
  pruneStaleBranchesCommand,
];
export default RegisteredCommands;
