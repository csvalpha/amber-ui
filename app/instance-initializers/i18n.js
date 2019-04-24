export function initialize(instance) {
  const i18n = instance.lookup('service:i18n');
  const localStorage = instance.lookup('service:local-storage');
  if (i18n.get('locales').includes(localStorage.getItem('locale'))) {
    i18n.set('locale', localStorage.getItem('locale'));
  } else {
    i18n.set('locale', calculateLocale());
  }
}

export default {
  name: 'i18n',
  after: 'ember-data',
  initialize
};

function calculateLocale() {
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;
  return language.toLowerCase().includes('en') ? 'en' : 'nl';
}
