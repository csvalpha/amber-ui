import { fillable, value, property } from 'ember-cli-page-object';
import checkbox from 'alpha-amber/tests/pages/helpers/checkbox';

export default {
  ifesDataSharingPreference: checkbox('[data-test-ifesDataSharingPreference]'),
  ifesDataSharingPreferenceValue: property('checked', '[data-test-ifesDataSharingPreference]'),
  infoInAlmanak: checkbox('[data-test-infoInAlmanak]'),
  infoInAlmanakValue: property('checked', '[data-test-infoInAlmanak]'),
  picturePublicationPreferenceTypes: fillable('[data-test-picturePublicationPreferenceTypes]'),
  picturePublicationPreferenceTypesValue: value('[data-test-picturePublicationPreferenceTypes]'),

  fillIn(values) {
    return this
      .ifesDataSharingPreference(values.ifesDataSharingPreference)
      .infoInAlmanak(values.infoInAlmanak)
      .picturePublicationPreferenceTypes(values.picturePublicationPreferenceTypes);
  }
};
