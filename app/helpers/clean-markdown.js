import { helper } from '@ember/component/helper';
import removeMd from 'npm:remove-markdown';

export function cleanMarkdown([text]) {
  return removeMd(text);
}

export default helper(cleanMarkdown);
