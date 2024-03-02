# amber-ui

[![Continuous Integration](https://github.com/csvalpha/amber-ui/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/csvalpha/amber-ui/actions/workflows/continuous-integration.yml)
[![Continuous Delivery](https://github.com/csvalpha/amber-ui/actions/workflows/continuous-delivery.yml/badge.svg)](https://github.com/csvalpha/amber-ui/actions/workflows/continuous-delivery.yml)
[![codecov](https://codecov.io/gh/csvalpha/amber-ui/graph/badge.svg?token=GMTXV28YQF)](https://codecov.io/gh/csvalpha/amber-ui)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://www.ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd amber-ui`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server` to run tests after every file change

### Test data

For the generation of test data, we use [ember-cli-mirage](http://www.ember-cli-mirage.com/). Data is created in factories
and randomized using Faker.

### Preview generated data

To preview generated data in the browser, set `ENV['ember-cli-mirage'].enabled` to `true` for
development in `config/environment.js`. The content generated for development is described in `mirage/scenarios/default.js`.

### Linting

* `yarn lint`
* `yarn lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deployments are done using GitHub Actions. To deploy a branch, follow the following steps:

- Go to the Continuous Delivery [workflow page](https://github.com/csvalpha/amber-ui/actions/workflows/continuous-delivery.yml).
- Open the "Run workflow" modal.
- Choose a branch and if you want to merge the changes on the staging branch into the master branch (only possible when the branch chosen in previous step is master).
- Click the green button "Run workflow".

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://www.ember-cli.com/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
