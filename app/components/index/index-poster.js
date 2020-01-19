import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['index-poster'],
  attributeBindings: ['style'],
  style: computed('headerImageUrl', function() {
    return htmlSafe(`background-image: url(${this.headerImageUrl})`);
  }),
  images: [
    '/images/frontpage/serious.jpg',
    '/images/frontpage/smile.jpg',
    '/images/frontpage/dance.jpg',
    '/images/frontpage/fire.jpg'
  ],
  headerImageUrl: computed(function() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  })
});
