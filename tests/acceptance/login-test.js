/* eslint camelcase: "off" */
import { test } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import page from 'alpha-amber/tests/pages/login';
import { Response } from 'ember-cli-mirage';

moduleForAcceptance('Acceptance | login');

test('it loads the route', (assert) => {
  itShouldLoadRouteName(assert, {
    page,
    finalRouteName: 'login'
  });
});

test('it redirects to index when logging in', (assert) => {
  assert.expect(4);

  server.post('/oauth/token', (schema, request) => {
    const body = {};
    request.requestBody.split('&').forEach(keyValue => {
      const parts = keyValue.split('=');
      body[parts[0]] = parts[1];
    });

    assert.equal(body.username, 'test');
    assert.equal(body.password, 'password1234');
    assert.equal(body.grant_type, 'password');

    return {
      access_token: 'e9eea4d996f1b22d7a770f4ee9651e3a2d3d84b232c22a9f6705ab24633b478c',
      created_at: 123456789,
      expires_in: 7200,
      token_type: 'bearer'
    };
  }, 200);

  page
    .visit()
    .username('test')
    .password('password1234')
    .login();

  andThen(() => {
    const path = currentRouteName();
    assert.equal(path, 'index');
  });
});

test('it display an error when login failed', (assert) => {
  server.post('/oauth/token', {
    error: 'invalid_grant',
    error_description: 'De verstrekte authorisatie is ongeldig, verlopen, ingetrokken, komt niet overeen met de redirect uri die is opgegeven, of werd uitgegeven aan een andere klant.'
  }, 401);

  page
    .visit()
    .username('test')
    .password('password1234')
    .login();

  andThen(() => {
    const path = currentRouteName();
    assert.equal(path, 'login');
    assert.equal(page.error, 'De ingevoerde combinatie is niet bekend');
  });
});

test('it displays the verification code form', (assert) => {
  server.post('oauth/token', () => {
    return new Response(401, {
      'x-amber-otp': 'required'
    }, {
      error: 'invalid_grant',
      error_description: 'De verstrekte authorisatie is ongeldig, verlopen, ingetrokken, komt niet overeen met de redirect uri die is opgegeven, of werd uitgegeven aan een andere klant.'
    });
  });

  page
    .visit()
    .username('test2fa')
    .password('password1234')
    .login();

  andThen(() => {
    const path = currentRouteName();
    assert.equal(path, 'login');
    assert.equal(find('.login-form h5.card-title').text(), 'Authenticatiecode');

    server.post('/oauth/token', (schema, request) => {
      const body = {};
      request.requestBody.split('&').forEach(keyValue => {
        const parts = keyValue.split('=');
        body[parts[0]] = parts[1];
      });

      assert.equal(body.username, 'test2fa');
      assert.equal(body.password, 'password1234');
      assert.equal(request.requestHeaders['x-amber-otp'], '123456');

      return {
        access_token: 'e9eea4d996f1b22d7a770f4ee9651e3a2d3d84b232c22a9f6705ab24633b478c',
        created_at: 123456789,
        expires_in: 7200,
        token_type: 'bearer'
      };
    }, 200);

    fillIn('input#field-otp', '123456');
    click('button.login-button');

    andThen(() => {
      const path = currentRouteName();
      assert.equal(path, 'index');
    });
  });
});
