export function initialize(instance) {
  const application = instance.lookup('application:main');
  const store = instance.lookup('service:store');
  application.set('store', store);
}

export default {
  name: 'store-on-app',
  after: 'ember-data',
  initialize
};
