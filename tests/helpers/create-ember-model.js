import SerializerRegistry from 'ember-cli-mirage/serializer-registry';

/**
 * @public
 * Helper function to turn mirage generated models into real ember data models.
 */
export default function(mirageModel, store) {
  // This solution serializes the mirage model as if it were a response to a request, and this request is given
  // to the store, so we can request the real model from the store.
  const registry = new SerializerRegistry(server, server.options.serializers);
  const serializedModel = registry.serialize(mirageModel);
  store.pushPayload(serializedModel);
  return store.peekRecord(serializedModel.data.type, serializedModel.data.id);
}
