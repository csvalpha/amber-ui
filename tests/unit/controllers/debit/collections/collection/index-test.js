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

function collection(id, { reload = async () => {} } = {}) {
  return {
    id,
    reload,
    hasMany: () => ({ reload }),
  };
}

function setupController(owner, model) {
  const controller = owner.lookup(
    'controller:debit/collections/collection/index'
  );
  controller.model = model;
  controller.transitions = [];
  controller.transitionToRoute = (...args) => controller.transitions.push(args);
  return controller;
}

module(
  'Unit | Controller | debit/collections/collection/index',
  function (hooks) {
    setupTest(hooks);

    let originalConfirm;
    hooks.beforeEach(function () {
      originalConfirm = window.confirm;
      window.confirm = () => true;
    });
    hooks.afterEach(function () {
      window.confirm = originalConfirm;
    });

    test('pendingCreditsTotal sums the credits', function (assert) {
      setupServices(this.owner, async () => ({ ok: true }));
      const controller = setupController(this.owner, {
        pendingDeclarationCredits: [{ amount: '12.50' }, { amount: '7.25' }],
      });
      assert.equal(controller.pendingCreditsTotal, 19.75);

      controller.model = { pendingDeclarationCredits: null };
      assert.equal(controller.pendingCreditsTotal, 0);
    });

    test('a successful finalize reloads and downloads the sepa file', async function (assert) {
      const flashes = setupServices(this.owner, async () => ({ ok: true }));
      const controller = setupController(this.owner, collection('5'));

      await controller.finalize();

      assert.false(controller.isFinalizing);
      assert.strictEqual(controller.finalizeErrors, null);
      assert.equal(flashes[0][0], 'success');
      assert.deepEqual(controller.transitions, [
        ['debit.collections.collection.sepa', '5'],
      ]);
    });

    test('a second click while finalizing is ignored', async function (assert) {
      let calls = 0;
      let resolvePost;
      setupServices(this.owner, () => {
        calls += 1;
        return new Promise((resolve) => (resolvePost = resolve));
      });
      const controller = setupController(this.owner, collection('5'));

      const first = controller.finalize();
      assert.true(controller.isFinalizing);
      await controller.finalize();
      resolvePost({ ok: true });
      await first;

      assert.equal(calls, 1);
      assert.false(controller.isFinalizing);
    });

    test('API errors are shown', async function (assert) {
      setupServices(this.owner, async () => ({
        ok: false,
        json: async () => ({ errors: [{ title: 'Al definitief' }] }),
      }));
      const controller = setupController(this.owner, collection('5'));

      await controller.finalize();

      assert.deepEqual(controller.finalizeErrors, [{ title: 'Al definitief' }]);
      assert.deepEqual(controller.transitions, []);
    });

    test('an unreadable error response or network error shows the fallback', async function (assert) {
      setupServices(this.owner, async () => ({
        ok: false,
        json: async () => {
          throw new SyntaxError('Unexpected token');
        },
      }));
      const controller = setupController(this.owner, collection('5'));
      await controller.finalize();
      assert.deepEqual(controller.finalizeErrors, [
        { title: 'Er ging iets mis' },
      ]);

      this.owner.lookup('service:fetch').post = async () => {
        throw new TypeError('Failed to fetch');
      };
      controller.finalizeErrors = null;
      await controller.finalize();
      assert.deepEqual(controller.finalizeErrors, [
        { title: 'Er ging iets mis' },
      ]);
      assert.false(controller.isFinalizing);
    });

    test('a failed reload warns without retrying the finalize', async function (assert) {
      const flashes = setupServices(this.owner, async () => ({ ok: true }));
      const controller = setupController(
        this.owner,
        collection('5', {
          reload: async () => {
            throw new Error('offline');
          },
        })
      );

      await controller.finalize();

      assert.strictEqual(controller.finalizeErrors, null);
      assert.deepEqual(
        flashes.map(([type]) => type),
        ['success', 'warning']
      );
      assert.deepEqual(controller.transitions, []);
    });

    test('cancelling the confirmation does nothing', async function (assert) {
      let calls = 0;
      setupServices(this.owner, async () => {
        calls += 1;
        return { ok: true };
      });
      window.confirm = () => false;
      const controller = setupController(this.owner, collection('5'));

      await controller.finalize();

      assert.equal(calls, 0);
    });
  }
);
