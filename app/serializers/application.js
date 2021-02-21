import JSONAPISerializer from '@ember-data/serializer/json-api';
import { inject as service } from '@ember/service';
import { underscore } from '@ember/string';
import Ember from 'ember';

const {  Logger } = Ember;

const verbReplacements = {
  new: 'create',
  show: 'read',
  index: 'read',
  edit: 'update'
};

export default JSONAPISerializer.extend({
  session: service('session'),

  // Remove all Links data, since AMBER API's JsonAPI::Resources
  // provides wrong links data for namespaced models
  normalize(typeHash, hash) {
    if (hash.relationships) {
      Object.keys(hash.relationships).forEach(relationship => {
        if (hash.relationships[relationship].data) {
          delete hash.relationships[relationship].links;
        }
      });
    }

    return this._super(...arguments);
  },
  permissionNameForRoute(routeName, owner) {
    const parts = routeName.split('.');

    // Normalize action
    let action = parts[parts.length - 1];
    if (action in verbReplacements) {
      action = verbReplacements[parts[parts.length - 1]];
    }

    const route = owner.lookup(`route:${routeName}`);
    if (route === undefined) {
      Logger.error(`Route '${routeName}' is not defined`);
    }

    const { modelName } = route;
    if (modelName === undefined || modelName === null) {
      Logger.error(`modelName for route '${routeName}' is not defined nor overridden`);
    }

    return `${modelName}.${action}`;
  },
  keyForAttribute(attr) {
    // Keys for attributes are underscored in the API (created_at)
    // while Ember uses kebab case (created-at)
    return underscore(attr);
  },

  keyForRelationship(key, relationship, method) {
    // Keys for attributes are underscored in the API (open_questions)
    // while Ember uses kebab case (open-questions)
    const result = this._super(key, relationship, method);
    return underscore(result);
  },

  modelNameFromPayloadKey(key) {
    // Add the namespace to the PayloadKey
    // The api gives type forms while Ember expects form/forms
    key = this._super(key);
    if (['form', 'closed-question',
      'closed-question-answer', 'closed-question-option',
      'open-question', 'open-question-answer', 'response'].includes(key)) {
      return `form/${key}`;
    }

    if (['category', 'post', 'thread'].includes(key)) {
      return `forum/${key}`;
    }

    if (['collection', 'transaction', 'mandate'].includes(key)) {
      return `debit/${key}`;
    }

    return key;
  },

  payloadKeyFromModelName(modelName) {
    // Remove the namespace from the modelName
    // The API expects forms while the Ember ModelName is form/forms
    const result = this._super(modelName);
    return underscore(result.split('/').pop());
  }
});
