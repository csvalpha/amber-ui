import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import Application from '../../app';
import config from '../../config/environment';

import './current-model-count';
import './last-created-model';
import './validation-error';
import './validation-errors';

import './unit/it-should-rollback-relationship';
import './unit/it-should-rollback-unsaved-changes';
import './unit/it-should-remove-new-model';
import './unit/it-should-remove-relationship';

export default function startApp(attrs) {
  let application;
  let attributes = assign({}, config.APP);
  attributes = assign(attributes, attrs); // Use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
