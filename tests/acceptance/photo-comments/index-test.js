import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/photo-comments/index';

const modelName = 'photo';
const permissions = ['photo-album.read', 'photo.read', 'photo-comment.read'];

moduleForAcceptance('Acceptance | photo-comments/index', {
  beforeEach() {
    server.createList(modelName, 3);
    const photoWithMultipleComments = server.create('photo');
    const photoWithOneComment = server.create('photo');
    server.createList('photo-comment', 3, { photo: photoWithMultipleComments });
    server.create('photo-comment', { photo: photoWithOneComment });
  }
});

test('it redirects to login when not logged in', (assert) => {
  whenNotLoggedIn();
  itShouldRedirectToLogin(assert, {
    page
  });
});

test('it loads the route when logged in and with permissions', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'photo-comments.index'
  });
});

test('it lists the photos', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  page.visit();
  andThen(() => {
    assert.equal(page.amountOfPhotos, 5);
  });
});

test('it lists the photocomments', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  page.visit();
  andThen(() => {
    assert.equal(page.amountOfPhotoComments, 4);
  });
});

test('it shows a 404 when without permission', (assert) => {
  whenLoggedIn();
  itShouldLoadNotFound(assert, {
    page
  });
});

test('it creates a photo-comment', (assert) => {
  whenLoggedInAndWithPermissions(permissions);
  page.visit();

  fillIn('.photo-comment-input:last', 'My new post');
  click('button.submit-photo-comment-button:last');
  andThen(() => {
    assert.equal(find('.comment:last').text().trim(), 'My new post');
    assert.equal(page.amountOfPhotoComments, 5);
  });
});
