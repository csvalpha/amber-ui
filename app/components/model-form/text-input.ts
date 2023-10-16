import Component from '@glimmer/component';
import type Model from '@ember-data/model';

export interface TextInputSignature<T extends Model = Model> {
  Args: {
    inputLayout?: string;
    labelClass?: string;
    inputWrapperClass?: string;
    model: T;
    property: keyof T;
    label: string;
  };
}

export default class TextInput<
  Signature extends TextInputSignature = TextInputSignature
> extends Component<Signature> {
  get usesGrid() {
    return typeof this.args.inputLayout === 'undefined';
  }

  get labelClass() {
    return this.args.labelClass ?? 'col-sm-2';
  }

  get inputWrapperClass() {
    return this.args.inputWrapperClass ?? 'col-sm-10';
  }

  get isInvalid() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.args.model.get?.('errors')?.get(this.args.property as any)?.length >
      0
    );
  }

  get inputValidityClass() {
    return this.isInvalid ? 'is-invalid' : '';
  }

  get inputIdentifier() {
    return `${(this.args.model.constructor as typeof Model).modelName}-form-${
      this.args.property
    }`;
  }

  get placeholder() {
    return this.args.label;
  }
}
