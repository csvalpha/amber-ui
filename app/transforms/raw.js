import Transform from '@ember-data/serializer/transform';
import { isNone } from '@ember/utils';

export default Transform.extend({
  deserialize(serialized) {
    return isNone(serialized) ? {} : serialized;
  },

  serialize(deserialized) {
    return isNone(deserialized) ? {} : deserialized;
  }
});
