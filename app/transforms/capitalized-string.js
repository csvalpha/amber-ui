import Transform from '@ember-data/serializer/transform';

export default Transform.extend({
  deserialize(serialized) {
    // Client wants nice capatilized version
    return serialized.capitalize();
  },

  serialize(deserialized) {
    // Server expects lowercase value
    return deserialized.toLowerCase();
  }
});
