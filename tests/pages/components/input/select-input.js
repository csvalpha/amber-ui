import {
  collection,
  value,
  property,
  selectable
} from 'ember-cli-page-object';

export default {
  id: property('id'),
  value: value(),
  required: property('required'),
  disabled: property('disabled'),
  select: selectable(),
  options: collection({
    itemScope: 'option',
    item: {
      disabled: property('disabled'),
      value: value()
    }
  })
};
