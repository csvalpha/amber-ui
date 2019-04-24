import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('whenLoggedInAndWithPermissions', (app, permissions) => {
  whenLoggedIn();
  whenWithPermissions(permissions);
});
