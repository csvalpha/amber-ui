import Component from '@glimmer/component';

export default class TextInput extends Component {
  get usesGrid() {
    return !this.args.inputLayout;
  }

  get labelClass() {
    return this.args.labelClass ?  this.args.labelClass : 'col-sm-2';
  }

  get inputWrapperClass() {
    return this.args.inputWrapperClass ? this.args.inputWrapperClass : 'col-sm-10';
  }

  get inputValidityClass() {
    return this.isInvalid ? 'is-invalid' : '';
  }

  get isInvalid() {
    return this.args.model.get(`errors.${this.property}.length`) > 0;
  }

  get inputIdentifier() {
    // See http://stackoverflow.com/questions/34864580/ember-data-model-getmodelname-is-undefined-but-model-internalmodel-works
    // On why model.constructor.modelName is used instead of model.modelName
    return `${this.args.model.constructor.modelName}-form-${this.args.property}`;
  }

  get placeholder() {
    return this.args.placeholder ? this.args.placeholder : this.args.label;
  }
}
