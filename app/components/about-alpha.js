import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['about-alpha'],
  store: service(),
  videos: [
    {
      videoId: 'x8tGpVON49Q',
      title: 'Over C.S.V. Alpha #1 Peter vertelt over de drie V\'s'
    },
    {
      videoId: 'mjAA02SGnaU',
      title: 'Over C.S.V. Alpha #2 Remco vertelt over kring'
    },
    {
      videoId: 'Z0IIwxAKt6A',
      title: 'Over C.S.V. Alpha #3 Christine vertelt over commissies'
    }
  ]
});
