import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupServices(owner, { post, fetch } = {}) {
  const flashes = [];
  const saved = [];
  owner.register(
    'service:fetch',
    class extends Service {
      post = post;
      fetch = fetch;
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
  owner.register(
    'service:file-saver',
    class extends Service {
      saveAs(blob, filename) {
        saved.push(filename);
      }
    }
  );
  return { flashes, saved };
}

function declaration(id, { reload, pdfFilename } = {}) {
  const record = {
    id,
    pdfFilename,
    reloads: 0,
    user: { get: () => 'Jan de Vries' },
  };
  record.reload =
    reload ??
    (async () => {
      record.reloads += 1;
    });
  return record;
}

function setupController(owner, model) {
  const controller = owner.lookup('controller:declarations/declaration/index');
  controller.model = model;
  return controller;
}

function errorResponse(...details) {
  return {
    ok: false,
    json: async () => ({ errors: details.map((detail) => ({ detail })) }),
  };
}

module('Unit | Controller | declarations/declaration/index', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.originalConfirm = window.confirm;
    window.confirm = () => true;
  });

  hooks.afterEach(function () {
    window.confirm = this.originalConfirm;
  });

  test('approve reloads the declaration on success', async function (assert) {
    const { flashes } = setupServices(this.owner, {
      post: async () => ({ ok: true }),
    });
    const model = declaration('3');
    const controller = setupController(this.owner, model);

    await controller.approve();

    assert.strictEqual(controller.errorMessage, null);
    assert.equal(model.reloads, 1);
    assert.deepEqual(flashes, [['success', 'Declaratie goedgekeurd!']]);
  });

  test('approve shows an error on a network failure', async function (assert) {
    setupServices(this.owner, {
      post: async () => {
        throw new TypeError('Failed to fetch');
      },
    });
    const model = declaration('3');
    const controller = setupController(this.owner, model);

    await controller.approve();

    assert.equal(
      controller.errorMessage,
      'Goedkeuren mislukt, probeer het opnieuw.'
    );
    assert.equal(model.reloads, 0);
  });

  test('approve explains a missing mandate', async function (assert) {
    setupServices(this.owner, {
      post: async () => errorResponse('Gebruiker heeft geen incassomandaat'),
    });
    const controller = setupController(this.owner, declaration('3'));

    await controller.approve();

    assert.true(controller.missingMandate);
    assert.ok(controller.errorMessage.includes('Jan de Vries'));
  });

  test('approve falls back to a generic message without error details', async function (assert) {
    setupServices(this.owner, { post: async () => errorResponse() });
    const controller = setupController(this.owner, declaration('3'));

    await controller.approve();

    assert.false(controller.missingMandate);
    assert.equal(
      controller.errorMessage,
      'Goedkeuren mislukt: er ging iets mis.'
    );
  });

  test('markManuallyPaid reloads the declaration on success', async function (assert) {
    const { flashes } = setupServices(this.owner, {
      post: async () => ({ ok: true }),
    });
    const model = declaration('3');
    const controller = setupController(this.owner, model);

    await controller.markManuallyPaid();

    assert.strictEqual(controller.errorMessage, null);
    assert.equal(model.reloads, 1);
    assert.equal(flashes[0][0], 'success');
  });

  test('markManuallyPaid does nothing when not confirmed', async function (assert) {
    let posted = false;
    setupServices(this.owner, {
      post: async () => {
        posted = true;
        return { ok: true };
      },
    });
    window.confirm = () => false;
    const controller = setupController(this.owner, declaration('3'));

    await controller.markManuallyPaid();

    assert.false(posted);
  });

  test('markManuallyPaid shows an error on a network failure', async function (assert) {
    setupServices(this.owner, {
      post: async () => {
        throw new TypeError('Failed to fetch');
      },
    });
    const model = declaration('3');
    const controller = setupController(this.owner, model);

    await controller.markManuallyPaid();

    assert.equal(
      controller.errorMessage,
      'Markeren mislukt, probeer het opnieuw.'
    );
    assert.equal(model.reloads, 0);
  });

  test('markManuallyPaid shows the API errors', async function (assert) {
    setupServices(this.owner, {
      post: async () => errorResponse('Al uitbetaald'),
    });
    const controller = setupController(this.owner, declaration('3'));

    await controller.markManuallyPaid();

    assert.equal(controller.errorMessage, 'Markeren mislukt: Al uitbetaald');
  });

  test('a failed reload is not reported as a failed marking', async function (assert) {
    const { flashes } = setupServices(this.owner, {
      post: async () => ({ ok: true }),
    });
    const controller = setupController(
      this.owner,
      declaration('3', {
        reload: async () => {
          throw new Error('offline');
        },
      })
    );

    await controller.markManuallyPaid();

    assert.strictEqual(controller.errorMessage, null);
    assert.deepEqual(
      flashes.map(([type]) => type),
      ['success', 'warning']
    );
  });

  test('an error for a declaration the user left does not touch the new one', async function (assert) {
    let resolvePost;
    setupServices(this.owner, {
      post: () => new Promise((resolve) => (resolvePost = resolve)),
    });
    const controller = setupController(this.owner, declaration('3'));

    const marking = controller.markManuallyPaid();
    controller.model = declaration('4');
    resolvePost(errorResponse('Al uitbetaald'));
    await marking;

    assert.strictEqual(controller.errorMessage, null);
  });

  test('downloadPdf uses the filename of the declaration it started for', async function (assert) {
    let resolveFetch;
    const { saved } = setupServices(this.owner, {
      fetch: () => new Promise((resolve) => (resolveFetch = resolve)),
    });
    const controller = setupController(
      this.owner,
      declaration('3', { pdfFilename: 'declaratie-3.pdf' })
    );

    const download = controller.downloadPdf();
    controller.model = declaration('4', { pdfFilename: 'declaratie-4.pdf' });
    resolveFetch({ ok: true, blob: async () => ({ type: 'application/pdf' }) });
    await download;

    assert.deepEqual(saved, ['declaratie-3.pdf']);
  });

  test('downloadReceipt uses the filename of the declaration it started for', async function (assert) {
    let resolveFetch;
    const { saved } = setupServices(this.owner, {
      fetch: () => new Promise((resolve) => (resolveFetch = resolve)),
    });
    const controller = setupController(
      this.owner,
      declaration('3', { pdfFilename: 'declaratie-3.pdf' })
    );

    const download = controller.downloadReceipt();
    controller.model = declaration('4');
    resolveFetch({ ok: true, blob: async () => ({ type: 'image/jpeg' }) });
    await download;

    assert.deepEqual(saved, ['bon_declaratie-3.jpg']);
  });

  test('downloadReceipt falls back to the id without a filename', async function (assert) {
    const { saved } = setupServices(this.owner, {
      fetch: async () => ({
        ok: true,
        blob: async () => ({ type: 'application/pdf' }),
      }),
    });
    const controller = setupController(this.owner, declaration('3'));

    await controller.downloadReceipt();

    assert.deepEqual(saved, ['bon-declaratie-3.pdf']);
  });
});
