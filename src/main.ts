import * as core from '@actions/core';
import * as github from '@actions/github';
import {IssuesCreateParamsDeprecatedAssignee} from '@octokit/rest';
import {getClient, getRequestParams} from './utils';

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

if (!module.parent) {
  run();
}

export {run};
