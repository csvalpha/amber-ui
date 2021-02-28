import Component from '@ember/component';

export default class FilterBarComponent extends Component {
  filter = null;
  classNames = ['d-none d-md-flex']
  sortedAttribute = null;
  sortableAttributes = null;
  sortedAscending = null;
}

