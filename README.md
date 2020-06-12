Alpha AMBER UI
===============

[![Build status](https://badge.buildkite.com/42748a5ed2c1c77c1dd974c497f0f39eaf39d782a289d19a8e.svg)](https://buildkite.com/csv-alpha/amber-ui)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM, see `.node-version`, install preferably with [nvm](https://github.com/creationix/nvm#install-script))
* [Yarn](https://yarnpkg.com/) (Alternative to NPM. Not strictly required, but uses version locking and is much faster)
* [Ember CLI](https://www.ember-cli.com/): `yarn global add ember-cli` (or `npm install -g ember-cli`)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn add` (or `npm install`)

## Running / Development

* `ember server` or `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details.

## Tests

The UI is tested using multiple types of test: unit, integration and acceptance.

### Running

When executing tests, the code style is checked using [XO](https://github.com/sindresorhus/xo), while the tests are
executed using ember. These two commands are combined in the `npm test` command.

To execute the tests:

   npm test

It is also possible to run only the ember tests in a browser (chrome). This allows to see what is going on, and for easier
debugging:

   ember exam --server

### Test data

For the generation of test data, we use [ember-cli-mirage](http://www.ember-cli-mirage.com/). Data is created in factories
and randomized using Faker.

### Preview generated data

To preview generated data in the browser, set `ENV['ember-cli-mirage'].enabled` to `true` for
development in `config/environment.js`. The content generated for development is described in `mirage/scenarios/default.js`.

#### XO on Windows
Make sure you are using LF as line ending instead of CRLF. In WebStorm this is done by selecting the `app` directory,
and change the line ending via `File` > `Line Separators` > `LF Unix & OS X (\n)`.
Also change this in `File` > `Settings` > `Editor` > `Code Style` > `Line seperator (for new files)`.

Note: this should be configured automatically using `.editorconfig`.

### Linting
* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js -- --fix`

For auto fix run
* `yarn jsfix`
* `yarn stylefix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deploying is done via buildkite. To do a deploy push to GitHub and click on the 'Deploy this step' button in buildkite to finish the deploy.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
