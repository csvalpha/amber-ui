import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  backgroundImageStyle: computed('backgroundImage', function() {
    return htmlSafe(`background: url('${this.get('backgroundImage')}'); background-size: cover; background-position: center;"`);
  })
});
