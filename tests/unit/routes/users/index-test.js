import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/index');
    assert.ok(route);
  });

  // TODO: Fix this mess
  // Dennis: I cant get the test for the model() method working, only with visit() the ajax request is mocked.
  // eslint-disable-next-line qunit/no-commented-tests
  /* test('model() returns a list of people', function(assert) {
    // Create dummy models
    // console.log(FactoryGuy.make('person').get('lastName'));
    FactoryGuyTestHelper.handleFindAll('person', 3);

    // Get the route
    let route = this.subject();

    // route.store = FactoryGuy.get('store');

    // console.log(route.model().get('length'));

    // console.log(FactoryGuy.get('store').findAll('person').get('length'));

    // visit('/people');
    route.set('store', FactoryGuy.get('store'));
    let models = route.model();

    assert.ok(true);
    // Dennis: This down here does not work yet (adapter operation failed)
    console.log(models.get('length'));

    andThen(() => {
      // Assert that the model() method returns all models
      assert.equal(models.get('length'), 3);
    });
  }); */
});
