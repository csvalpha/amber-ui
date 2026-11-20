# AI Dev Guide - AMBER UI

## Env
Ember 3.28 (Octane), ember-cli 4.11, ember-data 3.27, Node 18.14.2 (`.nvmrc`), Yarn 3.5.1
Container: `development-environment-alpha-1` (same as AMBER API and SOFIA)
Path in container: `~/amber-ui`
Shell: Must use `/bin/bash -l` for PATH
Port: 4200 (app), 7357 (testem), 7020 (live reload)
API: amber-api via `/api/v1` (proxied), SOFIA at http://localhost:5000

Run: enter container, `cd ~/amber-ui`, `ember s`, open http://localhost:4200
CMD: `docker exec -it development-environment-alpha-1 /bin/bash -l -c "cd ~/amber-ui && yarn <cmd>"`
Direct: Enter container, `cd ~/amber-ui`, then run `yarn <cmd>` / `ember <cmd>`

## Rules
1. Follow existing patterns
2. Tests for everything you add or change (coverage is reported to Codecov)
3. Follow ESLint, ember-template-lint and Stylelint or document exception with reason
4. Keep it simple: convention over configuration
5. Don't add packages unless they have real benefit (student-maintained, avoid bloat)
6. Octane only for new code: Glimmer components, native classes, `@tracked`, `@action`

## Linting
ESLint: `.eslintrc.js` (eslint:recommended, ember/recommended, prettier)
Prettier: `.prettierrc.js` → `singleQuote: true`
Warnings (legacy, don't add more): no-classic-classes, no-actions-hash, no-classic-components, require-tagless-components, no-controller-access-in-routes
Errors: camelcase (properties: always), lines-between-class-members (except single line)
Templates: `.template-lintrc.js` extends recommended, `no-bare-strings` off, several rules off with `TODO: activate those`
SCSS: `.stylelintrc.js` (standard + sass-guidelines), max-nesting-depth 3, concentric property order (`.stylelintrc.order.js`)
Exceptions: Must explain why in a comment in the config file

## Structure
Models: `app/models/*.js` extend `Model` from `@ember-data/model`
Abilities: `app/abilities/*.js` extend `Ability` from `ember-can` (permissions from amber-api)
Routes: `app/routes/**` extend `AuthenticatedRoute` / `ApplicationRoute` from `amber-ui/routes/application/application`
Controllers: `app/controllers/**`, index pages extend `FilterableAndSortableController`
Templates: `app/templates/**/*.hbs`
Components: `app/components/**` Glimmer (`.js` + `.hbs`), forms use `ModelForm::*` inputs
Translations: `translations/nl.yaml` + `translations/en.yaml` (ember-intl, keep both in sync)
Styles: `app/styles/**/*.scss` (Bootstrap 5 via ember-bootstrap)
Mock API: `mirage/` (models, factories, scenarios) with Faker
Tests: `tests/unit/**` (models, abilities, routes, controllers, helpers), `tests/integration/components/**`, `tests/rendering/components/**`

## Model Template
```js
// app/models/model-name.js
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ModelName extends Model {
  // Attributes
  @attr title;
  @attr('date') createdAt;

  // Relations
  @belongsTo('user') author;
  @hasMany('item') items;

  // Getters
  get isPublished() {
    return this.status === 'published';
  }

  isOwner(user) {
    return user.get('id') === this.author.get('id');
  }
}
```

## Ability Template
```js
// app/abilities/model-name.js
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class ModelName extends Ability {
  get canShow() {
    return this.session.hasPermission('model_name.read');
  }

  get canCreate() {
    return this.session.hasPermission('model_name.create');
  }

  get canEdit() {
    return (
      this.session.hasPermission('model_name.update') ||
      this.isOwner(this.model)
    );
  }

  get canDestroy() {
    return this.session.hasPermission('model_name.destroy');
  }

  isOwner(record) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && record.isOwner(currentUser);
  }
}
```
Usage: `this.abilities.can('edit model-name', model)` in JS, `{{#if (can 'edit model-name' @model)}}` in templates

## Route Template
```js
// app/routes/model-names/index.js
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ModelNamesIndexRoute extends AuthenticatedRoute {
  queryParams = { page: { refreshModel: true } };

  get pageActions() {
    return [
      {
        link: 'model-names.new',
        title: 'Nieuw item',
        icon: 'plus',
        canAccess: this.abilities.can('create model-names'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show model-names');
  }

  model(params) {
    return this.store.queryPaged('model-name', params);
  }
}

// app/routes/model-names/new.js
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ModelNamesNewRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Item aanmaken' };

  canAccess() {
    return this.abilities.can('create model-names');
  }

  model() {
    return this.store.createRecord('model-name');
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
```
`canAccess()` without args runs in `beforeModel`, `canAccess(model)` runs in `afterModel`. Never more than 1 argument.
Register new routes in `app/router.js`.

## Test Template (Ability)
```js
// tests/unit/abilities/model-name-test.js
import Service from '@ember/service';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupSession(owner, { id = '1', permissions = [] } = {}) {
  owner.register(
    'service:session',
    class extends Service {
      isAuthenticated = true;
      currentUser = EmberObject.create({ id });
      hasPermission(name) {
        return permissions.includes(name);
      }
    }
  );
}

module('Unit | Ability | model-name', function (hooks) {
  setupTest(hooks);

  test('a user with update permission can edit', function (assert) {
    setupSession(this.owner, { permissions: ['model_name.update'] });
    const ability = this.owner.lookup('ability:model-name');
    ability.model = { isOwner: () => false };
    assert.true(ability.canEdit);
  });
});
```

## Test Template (Component)
```js
// tests/integration/components/model-name/card-test.js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | model-name/card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the title', async function (assert) {
    await render(hbs`<ModelName::Card @title='title' />`);
    assert.dom(this.element).hasText('title');
  });
});
```

## Mirage Factory Template
```js
// mirage/factories/model-name.js
import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  title: faker.lorem.sentence,
  content: faker.lorem.paragraph,
  createdAt() {
    return faker.date.past();
  },
});
```
Add a matching `mirage/models/model-name.js` and seed it in `mirage/scenarios/default.js` if needed.

## Test What
Models: getters, helper methods (`isOwner`, status flags), computed values
Abilities: every `can*` getter, with and without permission, owner vs non-owner, per status
Routes: exists, `canAccess`, model hook, `pageActions`
Controllers: actions, query params, tracked state
Components: rendering with args, actions/callbacks, conditional UI

## Commands
Serve: `ember s`
Test all (lint + tests): `yarn test`
Tests only: `yarn test:ember` or `ember test`
Test filter: `ember test --filter "Ability | declaration"`
Test watch: `ember test --server` (or browse http://localhost:4200/tests)
Coverage: `COVERAGE=true ember test`
Lint: `yarn lint`
Lint fix: `yarn lint:fix`
Lint parts: `yarn lint:js`, `yarn lint:hbs`, `yarn lint:scss`
Generate: `ember g component name`, `ember g route name`, `ember g model name`
Build: `ember build` / `yarn build` (production)

## Docker Commands
Enter: `docker exec -it development-environment-alpha-1 /bin/bash -l` then `cd ~/amber-ui`
Start env: from your own `development-environment` checkout, run `docker compose -f docker-compose.development.yml up -d`
Run cmd: `docker exec -it development-environment-alpha-1 /bin/bash -l -c "cd ~/amber-ui && yarn lint"`
Logs: `docker logs development-environment-alpha-1`

## Key Packages
ember-data, ember-simple-auth (OAuth2 with amber-api), ember-can, ember-intl, ember-bootstrap, ember-concurrency, ember-power-select, ember-file-upload, ember-cli-mirage, ember-moment, Font Awesome, Sentry

## Pitfalls
- Don't use `docker exec ... yarn ...` without `/bin/bash -l` (PATH + working dir issues)
- Don't skip tests or lint, CI runs `lint:hbs`, `lint:js`, `lint:scss` and `test:ember` separately
- Don't write new classic components, actions hashes or `Ember.Object.extend`
- Don't duplicate permission logic, put it in an ability and use `can`
- Don't forget `rollbackAttributes()` in `deactivate` of new/edit routes
- Don't add a translation key to only one of `nl.yaml` / `en.yaml`
- Use single quotes in JS and templates (Prettier + template lint)
- Use attribute names in camelCase, the serializer maps them to snake_case for amber-api
- Keep logic out of templates, use getters on the component/model
