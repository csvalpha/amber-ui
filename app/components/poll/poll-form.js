import { FormFormComponent } from 'alpha-amber/components/form/form-form';

const PollFormComponent = FormFormComponent.extend();

PollFormComponent.reopenClass({
  positionalParams: ['model']
});

export default PollFormComponent;
