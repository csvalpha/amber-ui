import { reads } from '@ember/object/computed';
import ModelFormTextInputComponent from './text-input';

export default ModelFormTextInputComponent.extend({
  tagName: 'fieldset',
  options: null,
  requiredAndNothingSelected: reads('required'),
});
