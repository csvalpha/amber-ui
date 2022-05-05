import { helper } from '@ember/component/helper';
import { AlmanakSubscriptionPreferenceTypes } from 'amber-ui/constants';

export function humanizeAlmanakSubscriptionPreference([option]) {
  return AlmanakSubscriptionPreferenceTypes[option];
}

export default helper(humanizeAlmanakSubscriptionPreference);
