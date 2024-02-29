import { error } from "console";
import {
  BranchMultiDeleteResult,
  simpleGit,
  SimpleGitOptions,
} from "simple-git";
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

// Returns a list of stale branches
export const getStaleLocalBranches = async (
  baseDirectory: string
): Promise<string[]> => {
  // ie. "  branch/feature-1  d4fdffe [origin/branch/feature-1: gone] commit message here",
  const goneBranchRegex = /\[origin\/([^:\s]+): gone\]/;

  return await simpleGit(buildGitOptions(baseDirectory))
    .raw(["branch", "-vv"])
    .then((branchesOutput: string): string[] => {
      const detailedBranches = branchesOutput.split("\n");
      const goneBranches: string[] = detailedBranches
        .map((branchString) => branchString.match(goneBranchRegex)?.[1])
        .filter(Boolean) as string[];
      return goneBranches;
    });
};

export const deleteLocalBranches = async (
  baseDirectory: string,
  branches: string[]
): Promise<BranchMultiDeleteResult | null> => {
  if (branches.length === 0) {
    return null;
  }
  // When branches are merged, commit hashes are rewritten to history, so local commit hashes will not match the remote commit hashes
  // Because of this, we need to force delete the branches to avoid the "not fully merged" error even though they are
  const result = await simpleGit(
    buildGitOptions(baseDirectory)
  ).deleteLocalBranches(branches, true);
  if (result.errors.length > 0) {
    vscode.window.showErrorMessage(
      `Failed to delete branches: \n${result.errors
        .map((error) => error.branch)
        .join(",")}`
    );
  }
  return result;
};

// Prunes references to remote branches that no longer exist
export const pruneStaleRemoteBranches = (
  baseDirectory: string
): Promise<string | void> => {
  return simpleGit(buildGitOptions(baseDirectory)).raw(["fetch", "--prune"]);
};
