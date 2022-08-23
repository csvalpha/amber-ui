import ApplicationSerializer from 'amber-ui/serializers/application';

export default class StaticPage extends ApplicationSerializer {
  // Replace the primary key id with the slug.
  extractId(modelClass, resourceHash) {
    return resourceHash.attributes.slug;
  }
}
