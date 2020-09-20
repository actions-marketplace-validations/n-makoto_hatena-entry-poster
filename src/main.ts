import * as core from '@actions/core'
import {postEntry} from './postEntry'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const API_KEY: string = core.getInput('API_KEY')
    const BLOG_ID: string = core.getInput('BLOG_ID')
    const HATENA_ID: string = core.getInput('HATENA_ID')

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    const title = 'test title.'

    const content = [
      '[link](http://example.com)',
      '',
      '- item 1',
      '- item 2',
      '- item 3'
    ].join('\n')

    await postEntry({API_KEY, BLOG_ID, HATENA_ID, title, content})

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()