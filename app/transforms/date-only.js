import Transform from '@ember-data/serializer/transform';
import moment from 'moment';
import { isNone } from '@ember/utils';

// A calendar date without time. Parse it as local midnight, because
// `new Date('YYYY-MM-DD')` is UTC midnight and shows as the previous day west of UTC.
export default class DateOnly extends Transform {
  deserialize(serialized) {
    return isNone(serialized)
      ? null
      : moment(serialized, 'YYYY-MM-DD').toDate();
  }

  serialize(deserialized) {
    return isNone(deserialized)
      ? null
      : moment(deserialized).format('YYYY-MM-DD');
  }
}
