import { helper } from '@ember/component/helper';
import { DigtusSubscriptionPreferenceTypes } from 'amber-ui/constants';

export function humanizeDigtusSubscriptionPreference([option]) {
  return DigtusSubscriptionPreferenceTypes[option];
}

export default helper(humanizeDigtusSubscriptionPreference);
