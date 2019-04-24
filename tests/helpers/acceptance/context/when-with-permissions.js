import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('whenWithPermissions', (app, permissions) => {
  const { __container__: container } = app;
  const session = container.lookup('service:session');
  const store = container.lookup('service:store');
  const currentUser = session.get('currentUser');
  if (currentUser === null) {
    throw new Error('whenWithPermissions helper called without being logged in');
  }
  permissions.forEach((permission) => {
    currentUser.get('permissions').pushObject(store.createRecord('permission', { name: permission }));
  });
});
