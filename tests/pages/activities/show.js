import { assign } from '@ember/polyfills';
import {
  create,
  visitable,
  text
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';
import Activity from 'alpha-amber/models/activity';
import defaultModelAttributeSelectors from '../helpers/default-model-attribute-selectors';
import responseCard from '../components/form/response/response-card';
import responseCompletedAlert from '../components/form/response/response-completed-alert';
import formClosedAlert from '../components/form/response/form-closed-alert';

export default create(assign(
  defaultModelAttributeSelectors(Activity, 'activity'),
  {
    visit: visitable('/activities/:id'),
    title: text(testSelector('activity-title')),
    location: text(testSelector('activity-location')),
    price: text(testSelector('activity-price')),
    category: text(testSelector('activity-category')),
    description: text(testSelector('activity-description')),
    authorOrOnBehalfOf: text(testSelector('activity-author')),
    responseCard,
    responseCompletedAlert,
    formClosedAlert
  }
));
