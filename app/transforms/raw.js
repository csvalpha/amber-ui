import { isNone } from '@ember/utils';
import DS from 'ember-data';

const { Transform } = DS;

export default Transform.extend({
  deserialize(serialized) {
    return isNone(serialized) ? {} : serialized;
  },

  serialize(deserialized) {
    return isNone(deserialized) ? {} : deserialized;
  }
});
