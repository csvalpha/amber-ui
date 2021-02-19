import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class NewPollRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Poll aanmaken' }

  canAccess() {
    return this.can.can('create polls');
  }

  model() {
    const newPoll = this.store.createRecord('poll');
    newPoll.set('author', this.session.currentUser);
    const newForm = this.store.createRecord('form/form');
    const newQuestion = this.store.createRecord('form/closed-question');
    newQuestion.set('form', newForm);
    newQuestion.set('position', 0);
    newQuestion.set('required', true);
    newQuestion.set('fieldType', 'radio');
    newPoll.set('form', newForm);
    return newPoll;
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributesAndForm();
  }

}
