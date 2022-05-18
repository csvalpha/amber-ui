import { helper } from '@ember/component/helper';
import { PicturePublicationPreferenceTypes } from 'amber-ui/constants';

export function humanizePicturePublicationPreference([option]) {
  return PicturePublicationPreferenceTypes[option];
}

export default helper(humanizePicturePublicationPreference);
