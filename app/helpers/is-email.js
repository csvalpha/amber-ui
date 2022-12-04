import { helper } from '@ember/component/helper';

export function isEmail([text]) {
    return /^[\w.+-]+@[\w-]+\.[a-z]{2,6}$/.test(text);
}

export default helper(isEmail);