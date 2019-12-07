import { helper } from '@ember/component/helper';
import removeMd from 'remove-markdown';

export function cleanMarkdown([text]) {
  return removeMd(text);
}

export default helper(cleanMarkdown);
