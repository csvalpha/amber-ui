import { dropTask, restartableTask, timeout } from 'ember-concurrency';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Ember from 'ember';

export default class StudyRoomPresence extends Component {
  @service session;
  @service store;
  @service abilities;

  @tracked presenceModalIsOpen = false;
  @tracked model = [];
  @tracked newCurrentUserPresence = null;

  statusOptions = [
    {
      value: 'chilling',
      label: 'Chillen',
    },
    {
      value: 'studying',
      label: 'Studeren',
    },
    {
      value: 'vergaderen',
      label: 'Vergaderen',
    },
  ];

  @dropTask({ cancelOn: 'didInsertElement' }) *poll() {
    while (!Ember.testing) {
      yield this.fetchData.perform();
      yield timeout(1000 * 30); // Wait 30 seconds
    }
  }

  @restartableTask *fetchData() {
    /* eslint-disable camelcase */
    this.model = yield this.store.query('study-room-presence', {
      filter: { current_and_future: true },
    });
    /* eslint-enable camelcase */
  }

  constructor() {
    super(...arguments);
    this.poll.perform();
  }

  get currentUserPresence() {
    if (this.newCurrentUserPresence) {
      return this.newCurrentUserPresence;
    }
    return (
      this.model.filter((presence) => presence.user.get('isCurrentUser'))[0] ||
      null
    );
  }

  set currentUserPresence(presence) {
    this.newCurrentUserPresence = presence;
  }

  get sortedPresences() {
    return this.model.sortBy('endTime');
  }

  get overallStatus() {
    const currentStatusses = this.model
      .filter((presence) => {
        return moment().isBetween(
          moment(presence.startTime),
          moment(presence.endTime),
          'minute',
          '[)'
        );
      })
      .mapBy('status');

    if (currentStatusses.includes('chilling')) {
      return 'chilling';
    }

    if (currentStatusses.includes('studying')) {
      return 'studying';
    }

    return 'vergaderen';
  }

  get saveButtonDisabled() {
    return this.currentUserPresence === null;
  }

  @action
  setPresenceModalState(state) {
    this.presenceModalIsOpen = state === 'open';
  }

  @action
  deletePresence() {
    this.currentUserPresence.destroyRecord().then(() => {
      this.currentUserPresence = null;
    });
  }

  @action
  newPresence() {
    this.currentUserPresence = this.store.createRecord('study-room-presence', {
      startTime: moment().startOf('minute').toDate(),
      endTime: moment().startOf('minute').add(1, 'hours').toDate(),
      status: 'chilling',
      user: this.session.currentUser,
    });
  }

  @action
  save() {
    const presence = this.currentUserPresence;
    const fetch = this.fetchData;
    presence.save().then(() => fetch.perform());
    this.presenceModalIsOpen = false;
  }
}
