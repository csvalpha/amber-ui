import {
  text
} from 'ember-cli-page-object';

export default {
  userDetailsSharingPreference: text('[data-test-user-details-sharing-preference]'),
  ifesDataSharingPreference: text('[data-test-ifes-sharing-preference]'),
  infoInAlmanak: text('[data-test-info-in-almanak]'),
  picturePublicationPreference: text('[data-test-picture-publication-preference]')
};
