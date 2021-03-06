import Transform from '@ember-data/serializer/transform';
import { capitalize } from '@ember/string';

export default class CapitalizedString extends Transform {
  deserialize(serialized) {
    // Client wants nice capatilized version
    return capitalize(serialized);
  }

  serialize(deserialized) {
    // Server expects lowercase value
    return deserialized.toLowerCase();
  }
}
