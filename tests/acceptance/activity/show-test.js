import { assign } from '@ember/polyfills';
import { test, module } from 'qunit';
import moduleForAcceptance from 'alpha-amber/tests/helpers/module-for-acceptance';
import modelProperties from 'alpha-amber/tests/helpers/model-properties';
import page from 'alpha-amber/tests/pages/activities/show';
import Activity from 'alpha-amber/models/activity';

let model;
const modelName = 'activity';
const permissions = ['activity.read', 'form/form.read', 'form/response.read', 'form/response.create'];

const propertyNames = modelProperties(Activity, {
  include: [
    'title',
    'description',
    'authorOrOnBehalfOf'
  ],
  exclude: [
    'descriptionCamofied',
    'publiclyVisible',
    'updatedAt',
    'createdAt',
    'coverPhoto',
    'coverPhotoUrl'
  ]
});

moduleForAcceptance('Acceptance | activities/show', {
  beforeEach() {
    model = server.create(modelName);
  }
}, () => {
  test('it redirects to login', (assert) => {
    itShouldRedirectToLogin(assert, {
      page,
      routeParams: { id: model.id }
    });
  });

  module('when logged in', { beforeEach: () => whenLoggedIn() }, () => {
    test('it shows a 404', (assert) => {
      itShouldLoadNotFound(assert, {
        page,
        routeParams: { id: model.id }
      });
    });

    module('when with permissions', { beforeEach: () => whenWithPermissions(permissions) }, () => {
      test('it shows a 404 when activity does not exist', (assert) => {
        const id = model.id + 1;
        itShouldLoadNotFound(assert, {
          page,
          routeParams: { id }
        });
      });

      test('it loads the route when logged in with permissions', (assert) => {
        itShouldLoadRouteName(assert, {
          page,
          routeParams: { id: model.id },
          finalRouteName: 'activities.show'
        });
      });

      test('it displays the activity', (assert) => {
        page.visit({ id: model.id });
        andThen(() => {
          itDisplaysProperties(assert, {
            page,
            displayValues: translateModelToDisplayValues(model),
            propertyNames
          });
        });
      });

      test('it does not display the form', (assert) => {
        page.visit({ id: model.id });
        andThen(() => {
          assert.notOk(page.responseCard.isVisible, 'The response card should not be visible');
        });
      });

      module('when on behalf of group', {
        beforeEach: () => {
          model = server.create(modelName, 'onBehalfOfGroup');
        }
      }, () => {
        test('it shows the name of the group', (assert) => {
          assert.ok(model.group !== null);
          page.visit({ id: model.id });
          andThen(() => {
            itDisplaysProperties(assert, {
              page,
              displayValues: translateModelToDisplayValues(model),
              propertyNames
            });
          });
        });
      });

      module('when with form', {
        beforeEach: () => {
          model = server.create(modelName, 'withForm');
        }
      }, () => {
        test('it shows all questions when the form is open for response', (assert) => {
          const openQuestions = model.form.openQuestions.models;
          const closedQuestions = model.form.closedQuestions.models;
          const formComponent = page.responseCard.form;

          page.visit({ id: model.id });
          andThen(() => {
            assert.ok(page.responseCard.isVisible, 'The response card should be visible when form is open');
            assert.notOk(page.formClosedAlert.isVisible, 'There should be no alert that the form is closed');
            assert.equal(formComponent.openQuestions().count, openQuestions.length, 'The form should contain all open questions');
            assert.equal(formComponent.closedQuestions().count, closedQuestions.length, 'The form should contain all closed questions');
          });
        });

        test('it allows to submit a response', (assert) => {
          const openQuestions = model.form.openQuestions.models;
          const closedQuestions = model.form.closedQuestions.models;
          const answers = generateFormAnswers(model.form);
          const formComponent = page.responseCard.form;

          page.visit({ id: model.id });
          andThen(() => {
            // Fill in questions
            openQuestions.forEach(question => {
              const questionComponent = formComponent.openQuestions().filterBy('questionId', question.id).get('firstObject');
              questionComponent.fillInValue(answers.open[question.id].answer);
            });
            closedQuestions.forEach(question => {
              const questionComponent = formComponent.closedQuestions().filterBy('questionId', question.id).get('firstObject');
              const optionComponent = questionComponent.options().filterBy('value', answers.closed[question.id].option.id).get('firstObject');
              optionComponent.check(true);
            });

            // Submit the response
            page.responseCard.submit();

            andThen(() => {
              // Retrieve the created response
              const response = lastCreatedModel('form-responses');
              assert.ok(response, 'There should be a new response');

              // Validate open questions
              openQuestions.forEach(question => {
                const savedAnswer = getOpenQuestionAnswer(question.id, response.id);
                assert.ok(savedAnswer, `There should be an answer for open question ${question.id}`);
                assert.equal(savedAnswer.answer, answers.open[question.id].answer, `The answer to open question ${question.id} should be as filled in`);
              });

              // Validate closed questions
              closedQuestions.forEach(question => {
                question.options.models.forEach(option => {
                  const savedAnswer = getClosedQuestionAnswer(option.id, response.id);
                  const isChecked = answers.closed[question.id].option.id === option.id;

                  if (isChecked) {
                    assert.ok(savedAnswer, `There should be an answer for option ${option.id} of closed question ${question.id}`);
                  } else {
                    assert.notOk(savedAnswer, `There should not be an answer for option ${option.id} of closed question ${question.id}`);
                  }
                });
              });
            });
          });
        });

        module('when form is closed', {
          beforeEach: () => {
            model = server.create(modelName, { form: server.create('form-form', 'closed') });
          }
        }, () => {
          test('it does not show the form', (assert) => {
            page.visit({ id: model.id });
            andThen(() => {
              assert.notOk(page.responseCard.isVisible, 'The response card should not be visible when form is closed');
              assert.ok(page.formClosedAlert.isVisible, 'An alert should be visible that the form is closed');
            });
          });
        });

        module('when form opens later', {
          beforeEach: () => {
            model = server.create(modelName, { form: server.create('form-form', 'opensLater') });
          }
        }, () => {
          test('it does not show the form', (assert) => {
            page.visit({ id: model.id });
            andThen(() => {
              assert.notOk(page.responseCard.isVisible, 'The response card should not be visible when form is closed');
              assert.ok(page.formClosedAlert.isVisible, 'An alert should be visible that the form is closed');
            });
          });
        });
      });
    });
  });
});

function translateModelToDisplayValues(model) {
  const fullName = model.author.fullName();
  const { group } = model;

  return assign({}, model.attrs, {
    title: model.title,
    description: model.descriptionCamofied,
    authorOrOnBehalfOf: group === null ? fullName : group.name,
    createdAt: moment(model.createdAt).calendar(),
    startTime: moment(model.startTime).format('dddd D MMMM HH:mm'),
    endTime: moment(model.startTime).isSame(model.endTime, 'day')
      ? moment(model.endTime).format('HH:mm')
      : moment(model.endTime).format('dddd D MMMM HH:mm'),
    category: model.category.capitalize()
  });
}

function getOpenQuestionAnswer(questionId, responseId) {
  return server.db.formOpenQuestionAnswers.where({ questionId, responseId }).get('firstObject');
}

function getClosedQuestionAnswer(optionId, responseId) {
  return server.db.formClosedQuestionAnswers.where({ optionId, responseId }).get('firstObject');
}
