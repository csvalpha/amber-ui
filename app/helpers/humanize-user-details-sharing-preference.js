import { helper } from '@ember/component/helper';
import { UserDetailsPreferenceTypes } from 'alpha-amber/constants';

export function humanizeUserDetailsSharingPreference([option]) {
  return UserDetailsPreferenceTypes[option];
}

export default helper(humanizeUserDetailsSharingPreference);
