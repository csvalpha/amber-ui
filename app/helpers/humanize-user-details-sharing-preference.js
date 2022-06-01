import { helper } from '@ember/component/helper';
import { UserDetailsPreferenceTypes } from 'amber-ui/constants';

export function humanizeUserDetailsSharingPreference([option]) {
  return UserDetailsPreferenceTypes[option];
}

export default helper(humanizeUserDetailsSharingPreference);
