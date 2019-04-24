import { helper } from '@ember/component/helper';
import { PicturePublicationPreferenceTypes } from 'alpha-amber/constants';

export function humanizePicturePublicationPreference([option]) {
  return PicturePublicationPreferenceTypes[option];
}

export default helper(humanizePicturePublicationPreference);
