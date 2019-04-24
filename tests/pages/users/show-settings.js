import {
  create,
  visitable,
  text,
  isVisible
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/users/:id/settings'),

  // Privacy settings
  privacyPreferenceCardIsVisible: isVisible('[data-test-privacy-preference-card]'),

  // Protected info - Visible
  emergencyContactIsVisible: isVisible('[data-test-emergencyContact]'),
  emergencyNumberIsVisible: isVisible('[data-test-emergencyNumber]'),
  almanakSubscriptionPreferenceIsVisible: isVisible('[data-test-almanakSubscriptionPreference]'),
  digtusSubscriptionPreferenceIsVisible: isVisible('[data-test-digtusSubscriptionPreference]'),

  // Protected info - Data
  emergencyContact: text('[data-test-emergencyContact]'),
  emergencyNumber: text('[data-test-emergencyNumber]'),

  // Technical info
  idIsVisible: isVisible('[data-test-id]'),
  usernameIsVisible: isVisible('[data-test-username]'),
  loginEnabledIsVisible: isVisible('[data-test-loginEnabled]'),
  activatedAtIsVisible: isVisible('[data-test-activatedAtIsVisible]'),
  createdAtIsVisible: isVisible('[data-test-createdAtIsVisible]'),
  updatedAtIsVisible: isVisible('[data-test-updatedAtIsVisible]'),
  otpRequiredIsVisible: isVisible('[data-test-otpRequiredIsVisible]'),

  // Technical info - Data
  id: text('[data-test-id]'),
  username: text('[data-test-username]'),
  loginEnabled: text('[data-test-loginEnabled]'),
  createdAt: text('[data-test-createdAt]'),
  updatedAt: text('[data-test-updatedAt]'),
  otpRequired: text('[data-test-otpRequired]')
});
