'use strict'

const {join} = require('path')

const {
  env: {
    GITHUB_RELEASE_OAUTH,
    GIT_REPO_TAG,
    GIT_REPO_OWNER,
    GIT_REPO_NAME,
    ARTIFACTS_DIRECTORY
  },
  stdout,
  stderr,
  exit
} = require('process')

const {readdirSync} = require('fs')

const co = require('co')

const GitHubAPIs = require('github')

const {GitHubError} = require('../lib/error.js')

const {assign} = Object

if (GITHUB_RELEASE_OAUTH && GIT_REPO_TAG && GIT_REPO_OWNER && ARTIFACTS_DIRECTORY) {
  co(main)
    .then(
      () => stdout.write('Deployment finished successfully\n')
    )
    .catch(
      ({response, message}) => halt(response, message)
    )
} else {
  stdout.write('Missing environment variables\nSkip GitHub Release deployment\n')
}

function * main () {
  const github = new GitHubAPIs()
  github.authenticate({
    type: 'token',
    token: GITHUB_RELEASE_OAUTH
  })
  const DESC = {
    user: GIT_REPO_OWNER,
    repo: GIT_REPO_NAME,
    name: GIT_REPO_TAG,
    tag_name: GIT_REPO_TAG,
    tag: GIT_REPO_TAG,
    __proto__: null
  }
  const RELEASE_PROTO = assign({}, DESC, {
    draft: (/.*\-alpha[0-9]{0,}$/).test(GIT_REPO_TAG),
    prerelease: (/.*\-beta[0-9]{0,}$/).test(GIT_REPO_TAG),
    __proto__: null
  })
  const RELEASE_INFO = yield new Promise(
    (resolve, reject) =>
      github.repos.getReleaseByTag(DESC)
        .then(
          ({id}) =>
            github.repos.editRelease(assign({}, RELEASE_PROTO, {id}))
              .then(resolve, msgerr(reject, 'Editing release failed'))
        )
        .catch(
          () =>
            github.repos.createRelease(RELEASE_PROTO)
              .then(resolve, msgerr(reject, 'Creating release failed'))
        )
  )
  const RELEASE_DESC = assign({}, RELEASE_PROTO, {
    id: RELEASE_INFO.id,
    __proto__: null
  })
  try {
    const all = readdirSync(ARTIFACTS_DIRECTORY)
      .map(
        name =>
          assign({}, RELEASE_DESC, {
            name,
            filePath: join(ARTIFACTS_DIRECTORY, name),
            __proto__: null
          })
      )
      .map(
        request =>
          github.repos.uploadAsset(request)
      )
    yield Promise.all(all)
  } catch (error) {
    throw new GitHubError('Uploading artifacts failed', error)
  }
}

function halt (error, message) {
  stderr.write(message + '\n')
  stdout.write(JSON.stringify(error, undefined, 2) + '\n')
  exit(1)
}

function msgerr (reject, message) {
  return response =>
    reject(new GitHubError(message, response))
}
