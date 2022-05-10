import Component from '@glimmer/component';

export default class TextInputComponent extends Component {
  get usesGrid() {
    return typeof this.args.inputLayout === 'undefined';
  }

  get isInvalid() {
    return this.args.model.errors[this.args.property].length > 0;
  }

  get inputValidityClass() {
    return this.isInvalid ? 'is-invalid' : '';
  }

  get type() {
    return this.args.type ?? 'text';
  }

  get inputIdentifier() {
    // See http://stackoverflow.com/questions/34864580/ember-data-model-getmodelname-is-undefined-but-model-internalmodel-works
    // on why model.constructor.modelName is used instead of model.modelName.
    return `${this.args.model.constructor.modelName}-form-${this.args.property}`;
  }

  get placeholder() {
    return this.args.label;
  }
}
