import * as core from '@actions/core';
import {context, GitHub} from '@actions/github';
import {IssuesCreateParamsDeprecatedAssignee} from '@octokit/rest';

function getElements(collection: string): string[] {
  return collection.split(',').map(item => item.trim());
}
export function getClient(): GitHub {
  const token: string = process.env.GITHUB_TOKEN || '';
  return new GitHub(token);
}
export function getRequestParams(): IssuesCreateParamsDeprecatedAssignee {
  const title = core.getInput('title');
  const assignees = core.getInput('assignees');
  const body = core.getInput('body');
  const labels = core.getInput('labels');

  return {
    title,
    body,
    owner: context.repo.owner,
    repo: context.repo.repo,
    assignees: getElements(assignees),
    labels: getElements(labels)
  };
}
