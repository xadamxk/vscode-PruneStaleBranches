import * as vscode from "vscode";

import { previewStaleBranchesCommand } from "./previewStaleBranchesCommand";

const RegisteredCommands: (() => vscode.Disposable)[] = [
  previewStaleBranchesCommand,
];
export default RegisteredCommands;
