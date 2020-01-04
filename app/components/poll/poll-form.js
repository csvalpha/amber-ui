import { FormFormComponent } from 'app/components/form/form-form';

const PollFormComponent = FormFormComponent.extend();

PollFormComponent.reopenClass({
  positionalParams: ['model']
});

export default PollFormComponent;
