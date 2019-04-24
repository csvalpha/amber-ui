import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/groups/index';

const modelName = 'group';
const permissions = ['group.read'];

moduleForAcceptance('Acceptance | groups/index', {
  beforeEach() {
    server.createList(modelName, 1, { kind: 'bestuur' });
    server.createList(modelName, 3, { kind: 'lichting' });
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page
  });
});

test('it loads the route when logged in and with permission', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'groups.index'
  });
});

