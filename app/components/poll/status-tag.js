import { FormStatusTagComponent } from 'amber-ui/components/form/status-tag';

const PollStatusTagComponent = FormStatusTagComponent.extend({
  isNoneValue: 'laden...',
  responseCompletedValue: 'Ingevuld',
});

PollStatusTagComponent.reopenClass({
  positionalParams: ['form'],
});

export default PollStatusTagComponent;
