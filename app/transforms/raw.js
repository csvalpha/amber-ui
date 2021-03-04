import Transform from '@ember-data/serializer/transform';
import { isNone } from '@ember/utils';

export default class Raw extends Transform {
  deserialize(serialized) {
    return isNone(serialized) ? {} : serialized;
  }

  serialize(deserialized) {
    return isNone(deserialized) ? {} : deserialized;
  }
}
