import * as core from '@actions/core';
import * as github from '@actions/github';
import {IssuesCreateParamsDeprecatedAssignee} from '@octokit/rest';

function getClient(): github.GitHub {
  const token: string = process.env.GITHUB_TOKEN || '';
  return new github.GitHub(token);
}
function getRequestParams(): IssuesCreateParamsDeprecatedAssignee {
  const title = core.getInput('title');
  const assignees = core.getInput('assignees');
  const body = core.getInput('body');
  const labels = core.getInput('labels');

  return {
    assignees: assignees.split(','),
    body,
    labels: labels.split(','),
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title
  };
}

async function run(): Promise<void> {
  try {
    const octokit: github.GitHub = getClient();
    const issueParams: IssuesCreateParamsDeprecatedAssignee = getRequestParams();
    const issue = await octokit.issues.create(issueParams);
    core.info(`Issue created - Title: ${issue.data.title}, Number: ${issue.data.number}`);
    core.setOutput('issue_number', `${issue.data.number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
