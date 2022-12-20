import Transform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class DateOnly extends Transform {
  deserialize(serialized) {
    if (serialized !== null) {
      return new Date(serialized);
    } else {
      return null;
    }
  }

  serialize(deserialized) {
    if (deserialized !== null) {
      return moment(deserialized).format('YYYY-MM-DD');
    } else {
      return null;
    }
  }
}
