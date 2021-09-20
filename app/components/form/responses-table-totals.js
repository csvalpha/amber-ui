import Component from '@ember/component';
import { computed } from '@ember/object';

const ResponsesTableTotalsComponent = Component.extend({
  tagName: 'tr',
  form: null,
  amountOfVegetarians: computed('form.responses', function() {
    return this.form.get('responses').filterBy('user.vegetarian', true)
      .filterBy('completed', true).length;
  })
});

ResponsesTableTotalsComponent.reopenClass({
  positionalParams: ['form']
});

export default ResponsesTableTotalsComponent;
