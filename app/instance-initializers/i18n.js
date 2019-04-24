export function initialize(instance) {
  const i18n = instance.lookup('service:i18n');
  const localStorage = instance.lookup('service:local-storage');
  if (i18n.get('locales').includes(localStorage.getItem('locale'))) {
    i18n.set('locale', localStorage.getItem('locale'));
  } else {
    i18n.set('locale', 'nl');
  }
}

export default {
  name: 'i18n',
  after: 'ember-data',
  initialize
};
