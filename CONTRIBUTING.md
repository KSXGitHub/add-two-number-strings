# Contributing

## Our Standard

### Style Guide

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Our JavaScript code follows [StandardJS](https://standardjs.com/)

### Git Commit Message

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* When only changing documentation, include `[ci skip]` in the commit description

## Development

### Prerequisites

* [Git](https://git-scm.com/) ≥ 2.0.0

* POSIX Tools (bash, sh, cat, ls, etc)
  * Already avaible in POSIX OSes (Linux, macOS, etc)
  * Windows: [Git Bash](https://git-scm.com/), MinGW, [msys2](http://www.msys2.org/), [Cygwin](http://cygwin.com), etc.

* [Node.js](https://nodejs.org/) ≥ 8.0.0
  * Recommends [nvm](https://github.com/creationix/nvm) for POSIX (Linux, macOS, etc)
  * Windows users can use [nvm-windows](https://github.com/coreybutler/nvm-windows) or [chocolatey](https://chocolatey.org/packages/nodejs) as alternative

* A node package manager: NPM or YARN
  * NPM: Already installed along with Node.js
  * YARN: https://yarnpkg.com/

### Setup environment

#### Step 1: Get the code

Use Git to clone this project

```sh
mkdir react-hello-world && cd react-hello-world
git clone https://github.com/KSXGitHub/react-hello-world.git .
```

#### Step 2: Install necessary dependencies

If you're using NPM

```sh
npm install
```

If you're using YARN

```sh
yarn install
```

### Run, Test, Build, Deploy

#### Build

```sh
npm run build # OR: yarn run build
```

#### Start live server

```sh
npm start # OR: yarn start
```

#### Run overall test

```sh
npm test # OR: yarn test
```

**NOTE:** When an attempt to modify React DOM tree is made, the test should fail because of [snapshots' changes](./test/main/src/client/components/__snapshots__). This happens to prevent developers from accidentally modifying DOM structure without explicit intention. To resolve this, you must either [*assert the changes*](#assert-the-changes) by committing snapshots or [*undo the changes*](#undo-the-changes).

#### Run unit tests

```sh
npm run unit-test # OR: yarn run unit-test
```

#### Run and Watch unit tests

```sh
npm run unit-test-watch # OR: yarn run unit-test-watch
```

#### Snapshot testing

When an attempt to modify React DOM tree is made, the test should fail because of [snapshots' changes](./test/main/src/client/components/__snapshots__). This happens to prevent developers from accidentally modifying DOM structure without explicit intention. To resolve this, you must either [*assert the changes*](#assert-the-changes) by committing snapshots or [*undo the changes*](#undo-the-changes).

##### Assert the changes

When you explicitly intend to modify React DOM structure and the changes of snapshots are as expected, you must assert the changes:

```sh
# Step 1: Update snapshots
npm run jest # OR: yarn run jest

# Step 2: Assert snapshots' update
npm run jest -- --updateSnapshot # OR: yarn run jest -- --updateSnapshot

# Step 3: Commit snapshots' changes
git add <Snapshot Files>
git commit -m '<Commit Message>'
```

##### Undo the changes

When you do not want to modify React DOM structure but test fails due to snapshots' changes, that means DOM tree is accidentally modified, you must undo it. You can either undo the changes manually or discard all changes using `git clean`.

**Undo the changes manually:** You made many important changes that has yet to commit, you want to undo the unwanted snapshots' changes without discard the whole hard work. The only way to do it is to modify your code until the test no longer fail.

**Discard all changes using `git clean`:** This is the quickiest way to undo unwanted changes. Run `git help clean` to know how. Be careful to not losing your important but yet-to-commit hard work.
  * `git clean --dry-run` is absolutely safe, use it double-check the decision about to be made
  * `git clean --interactive` to make decision for every file individually
  * `git clean --force`: You must be absolutely certain that you won't regret after this
