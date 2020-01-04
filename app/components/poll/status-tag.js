import { FormStatusTagComponent } from 'app/components/form/status-tag';

const PollStatusTagComponent = FormStatusTagComponent.extend({
  isNoneValue: 'laden...',
  responseCompletedValue: 'Ingevuld'
});

PollStatusTagComponent.reopenClass({
  positionalParams: ['form']
});

export default PollStatusTagComponent;
