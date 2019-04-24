import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/activities/index';

const modelName = 'activity';
const permissions = ['activity.read'];

moduleForAcceptance('Acceptance | activities/index', {
  beforeEach() {
    server.createList(modelName, 3);
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page
  });
});

test('it shows a 404 when without permission', (assert) => {
  whenLoggedIn();
  itShouldLoadNotFound(assert, {
    page
  });
});

test('it loads the route when logged in with permissions', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'activities.index'
  });
});

test('it lists the activities', (assert) => {
  whenLoggedInAndWithPermissions(permissions);

  page.visit();
  andThen(() => {
    assert.equal(page.amountOfActivities, 3);
  });
});
