import { FormFormComponent } from '../form/form-form';

const PollFormComponent = FormFormComponent.extend();

PollFormComponent.reopenClass({
  positionalParams: ['model']
});

export default PollFormComponent;
