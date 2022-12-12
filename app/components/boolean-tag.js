import Component from '@glimmer/component';

export default class BooleanTag extends Component {
  get label() {
    switch (this.args.value) {
      case null:
        return 'Niet ingevuld';
      case true:
        return 'Ja';
      case false:
      default:
        return 'Nee';
    }
  }
}