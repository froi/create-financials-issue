jest.mock('@actions/core');
jest.mock('@actions/github');

const core = require('@actions/core');
const {GitHub, context} = require('@actions/github');
import {run} from '../src/main';

describe('main.ts tests', () => {
  beforeEach(() => {
    context.repo = {
      owner: 'owner',
      repo: 'repo'
    };
    process.env.GITHUB_TOKEN = 'NOT-A-TOKEN';
    const github = {
      issues: {
        create: jest.fn().mockReturnValueOnce(1)
      }
    };
    GitHub.mockImplementation(() => github);
  });
  test('test runs', async () => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce('Issue title')
      .mockReturnValueOnce('assign1, assign2, assign3')
      .mockReturnValueOnce('A larger string for the body of the issue.')
      .mockReturnValueOnce('label1, label2, label3');
    core.setOutput = jest.fn().mockReturnValueOnce(true);
    process.env.GITHUB_TOKEN = 'NOT-A-TOKEN';
    await run();
    // TODO: make proper checks
  });
});
