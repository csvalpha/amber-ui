import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';
import Application from '../../app';
import config from '../../config/environment';

import './current-model-count';
import './last-created-model';
import './validation-error';
import './validation-errors';

import './acceptance/assert/it-displays-properties';
import './acceptance/assert/it-displays-property';
import './acceptance/assert/it-hides-properties';
import './acceptance/assert/it-hides-property';
import './acceptance/assert/it-should-create-a-model';
import './acceptance/assert/it-should-have-equal-attributes';
import './acceptance/assert/it-should-load-route-name';
import './acceptance/assert/it-should-load-not-found';
import './acceptance/assert/it-should-not-create-a-model';
import './acceptance/assert/it-should-not-update-a-model';
import './acceptance/assert/it-should-redirect-to-login';
import './acceptance/assert/it-should-update-a-model';

import './acceptance/context/when-logged-in';
import './acceptance/context/when-logged-in-and-with-permissions';
import './acceptance/context/when-not-logged-in';
import './acceptance/context/when-with-permissions';
import './acceptance/context/when-with-validation-errors';

import './acceptance/generate-form-answers';

import './unit/it-should-rollback-relationship';
import './unit/it-should-rollback-unsaved-changes';
import './unit/it-should-remove-new-model';
import './unit/it-should-remove-relationship';

import text from './text'; /* eslint no-unused-vars: 0 */

export default function startApp(attrs) {
  let application;
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // Use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
