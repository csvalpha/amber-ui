import { helper } from '@ember/component/helper';
import { AlmanakSubscriptionPreferenceTypes } from 'alpha-amber/constants';

export function humanizeAlmanakSubscriptionPreference([option]) {
  return AlmanakSubscriptionPreferenceTypes[option];
}

export default helper(humanizeAlmanakSubscriptionPreference);
