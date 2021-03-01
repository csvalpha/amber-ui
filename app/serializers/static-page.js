import ApplicationSerializer from 'alpha-amber/serializers/application';

export default class StaticPage extends ApplicationSerializer {
  // Replace the primary key id with the slug.
  extractId(modelClass, resourceHash) {
    return resourceHash.attributes.slug;
  }
}
