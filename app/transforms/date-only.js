import Transform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class DateOnly extends Transform {
  deserialize(serialized) {
    return new Date(serialized);
  }

  serialize(deserialized) {
    return moment(deserialized).format('YYYY-MM-DD');
  }
}
