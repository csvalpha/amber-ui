export function initialize(instance) {
  const intl = instance.lookup('service:intl');
  const localStorage = instance.lookup('service:local-storage');
  if (intl.get('locales').includes(localStorage.getItem('locale'))) {
    intl.set('locale', localStorage.getItem('locale'));
  }
}

export default {
  name: 'intl',
  after: 'ember-data',
  initialize
};
