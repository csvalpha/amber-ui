import Transform from '@ember-data/serializer/transform';
import moment from 'moment';
import { isNone } from '@ember/utils';

export default class DateOnly extends Transform {
  deserialize(serialized) {
    return isNone(serialized) ? null : new Date(serialized);
  }

  serialize(deserialized) {
    return isNone(deserialized)
      ? null
      : moment(deserialized).format('YYYY-MM-DD');
  }
}
