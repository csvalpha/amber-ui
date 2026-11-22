import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupServices(owner, post) {
  const flashes = [];
  owner.register(
    'service:fetch',
    class extends Service {
      post = post;
    }
  );
  owner.register(
    'service:flash-notice',
    class extends Service {
      sendSuccess(message) {
        flashes.push(['success', message]);
      }

      sendWarning(message) {
        flashes.push(['warning', message]);
      }
    }
  );
  return flashes;
}

function declaration(id, reload = async () => {}) {
  return { id, reload };
}

function setupController(owner, model) {
  const controller = owner.lookup('controller:declarations/declaration/reject');
  controller.model = model;
  controller.transitions = [];
  controller.transitionToRoute = (...args) => controller.transitions.push(args);
  return controller;
}

module('Unit | Controller | declarations/declaration/reject', function (hooks) {
  setupTest(hooks);

  test('a successful rejection clears the draft and goes back', async function (assert) {
    const flashes = setupServices(this.owner, async () => ({ ok: true }));
    const controller = setupController(this.owner, declaration('3'));
    controller.rejectionReason = 'Geen bon';

    await controller.submit();

    assert.equal(controller.rejectionReason, '');
    assert.strictEqual(controller.errorMessage, null);
    assert.deepEqual(controller.transitions, [
      ['declarations.declaration', '3'],
    ]);
    assert.equal(flashes[0][0], 'success');
  });

  test('a failed response keeps the draft', async function (assert) {
    setupServices(this.owner, async () => ({ ok: false }));
    const controller = setupController(this.owner, declaration('3'));
    controller.rejectionReason = 'Geen bon';

    await controller.submit();

    assert.equal(controller.rejectionReason, 'Geen bon');
    assert.ok(controller.errorMessage);
    assert.deepEqual(controller.transitions, []);
  });

  test('a network error keeps the draft and shows a retryable error', async function (assert) {
    setupServices(this.owner, async () => {
      throw new TypeError('Failed to fetch');
    });
    const controller = setupController(this.owner, declaration('3'));
    controller.rejectionReason = 'Geen bon';

    await controller.submit();

    assert.equal(controller.rejectionReason, 'Geen bon');
    assert.equal(
      controller.errorMessage,
      'Afkeuren mislukt, probeer het opnieuw.'
    );
  });

  test('a failed reload is not reported as a failed rejection', async function (assert) {
    const flashes = setupServices(this.owner, async () => ({ ok: true }));
    const controller = setupController(
      this.owner,
      declaration('3', async () => {
        throw new Error('offline');
      })
    );

    await controller.submit();

    assert.strictEqual(controller.errorMessage, null);
    assert.deepEqual(
      flashes.map(([type]) => type),
      ['success', 'warning']
    );
    assert.deepEqual(controller.transitions, [
      ['declarations.declaration', '3'],
    ]);
  });

  test('a response for a declaration the user left does not touch the new one', async function (assert) {
    let resolvePost;
    setupServices(
      this.owner,
      () => new Promise((resolve) => (resolvePost = resolve))
    );
    const controller = setupController(this.owner, declaration('3'));

    const submission = controller.submit();
    controller.model = declaration('4');
    controller.rejectionReason = 'Nieuwe reden';
    resolvePost({ ok: true });
    await submission;

    assert.equal(controller.rejectionReason, 'Nieuwe reden');
    assert.deepEqual(controller.transitions, []);
  });

  test('resetDraft clears the reason and error', function (assert) {
    setupServices(this.owner, async () => ({ ok: true }));
    const controller = setupController(this.owner, declaration('3'));
    controller.rejectionReason = 'Geen bon';
    controller.errorMessage = 'Fout';

    controller.resetDraft();

    assert.equal(controller.rejectionReason, '');
    assert.strictEqual(controller.errorMessage, null);
  });
});
