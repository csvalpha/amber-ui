import Component from '@ember/component';
import { computed, get } from '@ember/object';

const ResponsesTableTotalsComponent = Component.extend({
  tagName: 'tr',
  form: null,
  amountOfVegetarians: computed('form.responses', function() {
    const responses = get(this, 'form.responses');
    return responses.filterBy('user.vegetarian', true).filterBy('completed', true).length;
  })
});

ResponsesTableTotalsComponent.reopenClass({
  positionalParams: ['form']
});

export default ResponsesTableTotalsComponent;
