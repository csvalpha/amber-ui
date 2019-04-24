import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/users/show-settings';
import {
  PicturePublicationPreferenceTypes
} from 'alpha-amber/constants';

let model;
const permissions = ['user.update'];

moduleForAcceptance('Acceptance | users/show-settings', {
  beforeEach() {
    model = server.create('user');
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page,
    routeParams: { id: model.id }
  });
});

test('it loads the route when logged in', (assert) => {
  whenLoggedIn();
  itShouldLoadRouteName(assert, {
    page,
    routeParams: { id: model.id },
    finalRouteName: 'users.show'
  });
});

test('it shows a 404 when user does not exist', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  const id = model.id + 1;
  itShouldLoadNotFound(assert, {
    page,
    routeParams: { id }
  });
});

test('it shows a 404 when logged in with read permissions', (assert) => {
  whenLoggedInAndWithPermissions(['user.read']);
  itShouldLoadNotFound(assert, {
    page,
    routeParams: { id: model.id }
  });
});

test('it displays the user information', (assert) => {
  whenLoggedInAndWithPermissions(permissions);

  page.visit({ id: model.id });

  andThen(() => {
    assert.equal(page.address, model.address, 'address');
    assert.equal(page.foodPreferences, model.foodPreferences || '', 'foodPreferences');
    assert.equal(page.birthday, moment(model.birthday).format('DD-MM-YYYY'), 'birthday');
    assert.equal(page.city, model.city, 'city');
    assert.equal(page.email, model.email, 'email');
    assert.equal(page.fullName, model.fullName(), 'fullName');
    assert.equal(page.phoneNumber, model.phoneNumber, 'phoneNumber');
    assert.equal(page.picturePublicationPreference, PicturePublicationPreferenceTypes[model.picturePublicationPreference], 'picturePublicationPreference');
    assert.equal(page.postcode, model.postcode, 'postcode');
    assert.equal(page.startStudy, moment(model.startStudy).format('DD-MM-YYYY'), 'startStudy');
    assert.equal(page.study, model.study, 'study');
    assert.equal(page.vegetarian, model.vegetarian ? 'Ja' : 'Nee', 'vegetarian');
  });
});

test('it displays the user information when user is own', (assert) => {
  whenLoggedIn();

  page.visit({ id: 1 });

  andThen(() => {
    assert.equal(page.address, model.address, 'address');
    assert.equal(page.foodPreferences, model.foodPreferences || '', 'foodPreferences');
    assert.equal(page.birthday, moment(model.birthday).format('DD-MM-YYYY'), 'birthday');
    assert.equal(page.city, model.city, 'city');
    assert.equal(page.email, model.email, 'email');
    assert.equal(page.fullName, model.fullName(), 'fullName');
    assert.equal(page.phoneNumber, model.phoneNumber, 'phoneNumber');
    assert.equal(page.picturePublicationPreference, PicturePublicationPreferenceTypes[model.picturePublicationPreference], 'picturePublicationPreference');
    assert.equal(page.postcode, model.postcode, 'postcode');
    assert.equal(page.startStudy, moment(model.startStudy).format('DD-MM-YYYY'), 'startStudy');
    assert.equal(page.study, model.study, 'study');
    assert.equal(page.vegetarian, model.vegetarian ? 'Ja' : 'Nee', 'vegetarian');
  });
});
