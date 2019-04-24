import { helper } from '@ember/component/helper';
import { DigtusSubscriptionPreferenceTypes } from 'alpha-amber/constants';

export function humanizeDigtusSubscriptionPreference([option]) {
  return DigtusSubscriptionPreferenceTypes[option];
}

export default helper(humanizeDigtusSubscriptionPreference);
