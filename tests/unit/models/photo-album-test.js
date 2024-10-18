import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let album;
let photos = [];

module('Unit | Model | photo-album', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    const store = this.owner.lookup('service:store');
    photos = [
      store.createRecord('Photo'),
      store.createRecord('Photo'),
      store.createRecord('Photo'),
    ];
    album = store.createRecord('PhotoAlbum', { photos });
  });

  test('Photo count', function (assert) {
    assert.expect(2);
    photos[0].amountOfTags = 0;
    photos[1].amountOfTags = 1;
    photos[2].amountOfTags = 5;
    assert.equal(album.amountOfPhotos, 3, 'Amount of photos is correct');
    assert.equal(album.amountOfTaggedPhotos, 2, 'Amount of tagged photos in album is correct');
  });
});
