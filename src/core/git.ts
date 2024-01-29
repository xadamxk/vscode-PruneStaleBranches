import { simpleGit, SimpleGitOptions } from "simple-git";
import * as vscode from "vscode";

const baseOptions: Partial<SimpleGitOptions> = {
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const buildGitOptions = (path: string): Partial<SimpleGitOptions> => {
  return {
    ...baseOptions,
    baseDir: path,
  };
};

export const getBranches = (baseDirectory: string): Promise<string[]> => {
  return simpleGit(buildGitOptions(baseDirectory))
    .branch(["-vv"])
    .then((branches): string[] => {
      vscode.window.showInformationMessage(branches.all.toString());
      return branches.all;
    });
};

export const pruneRemoteBranches = (
  baseDirectory: string
): Promise<string | void> => {
  return simpleGit(buildGitOptions(baseDirectory))
    .remote(["update --prune"])
    .then((branch): string | void => {
      vscode.window.showInformationMessage(branch || "");
      return branch;
    });
};
