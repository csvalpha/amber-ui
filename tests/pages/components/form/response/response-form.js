import { collection } from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';
import openQuestionComponent from './open-question';
import closedQuestionComponent from './closed-question';

export default {
  openQuestions: collection({
    itemScope: testSelector('open-question'),
    item: openQuestionComponent
  }),
  closedQuestions: collection({
    itemScope: testSelector('closed-question'),
    item: closedQuestionComponent
  })
};
