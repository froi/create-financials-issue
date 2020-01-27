jest.mock('@actions/core');
jest.mock('@actions/github');

const core = require('@actions/core');
const {GitHub, context} = require('@actions/github');

import {getClient, getRequestParams} from '../src/utils';
import {IssuesCreateParamsDeprecatedAssignee} from '@octokit/rest';

function getRandomNumber(): Number {
  return Math.floor(Math.random() * 100);
}
describe('utils.js tests', () => {
  beforeEach(() => {
    context.repo = {
      owner: 'owner',
      repo: 'repo'
    };
    process.env.GITHUB_TOKEN = 'NOT-A-TOKEN';
    const github = {
      issues: {
        create: jest.fn().mockReturnValueOnce(getRandomNumber())
      }
    };
    GitHub.mockImplementation(() => github);
  });

  test('returns IssuesCreateParamsDeprecatedAssignee', async () => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce('Issue title')
      .mockReturnValueOnce('assign1, assign2, assign3')
      .mockReturnValueOnce('A larger string for the body of the issue.')
      .mockReturnValueOnce('label1, label2, label3');

    const result: IssuesCreateParamsDeprecatedAssignee = getRequestParams();
    const expected = {
      owner: 'owner',
      repo: 'repo',
      title: 'Issue title',
      assignees: ['assign1', 'assign2', 'assign3'],
      body: 'A larger string for the body of the issue.',
      labels: ['label1', 'label2', 'label3']
    };

    expect(result).toMatchObject(expected);
  });
  test('returns a GitHub client', async () => {
    const github = getClient();

    expect(github).toBeInstanceOf(Object); // TODO: look into this more. I don't think this is correct.
  });
});
