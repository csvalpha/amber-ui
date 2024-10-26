import { task, timeout } from 'ember-concurrency';
import Component from '@ember/component';
import Ember from 'ember';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import moment from 'moment';
import { inject as service } from '@ember/service';

const StudyRoomPresence = Component.extend({
  session: service(),
  store: service(),
  abilities: service(),
  presenceModalIsOpen: false,
  model: [],

  statusOptions: [
    {
      value: 'present',
      label: 'Aanwezig',
    },
    {
      value: 'busy',
      label: 'Bezig',
    },
    {
      value: 'absent',
      label: 'Afwezig',
    },
  ],

  // Periodically poll for new studyroom data
  poll: task(function* () {
    while (!Ember.testing) {
      this.fetchData.perform();
      yield timeout(1000 * 30); // Wait 30 seconds
    }
  })
    .drop()
    .on('didInsertElement'),

  // Fetch task is separate from polling task, so we can call it individually.
  fetchData: task(function* () {
    /* eslint-disable camelcase */
    const model = yield this.store.query('study-room-presence', {
      filter: { current_and_future: true },
    });
    /* eslint-enable camelcase */

    this.set('model', model);
  }).restartable(),

  currentUserPresence: computed('model.[]', function () {
    return (
      this.model.filter((presence) => presence.get('user.isCurrentUser'))[0] ||
      null
    );
  }),

  sortedPresences: computed('model.[]', function () {
    return this.model.sortBy('endTime');
  }),

  overallStatus: computed('model.[]', function () {
    const currentStatusses = this.model
      .filter((presence) => {
        return moment().isBetween(
          moment(presence.get('startTime')),
          moment(presence.get('endTime')),
          'minute',
          '[)'
        );
      })
      .mapBy('status');

    if (currentStatusses.includes('present')) {
      return 'present';
    } else if (currentStatusses.includes('busy')) {
      return 'busy';
    }

    return 'absent';
  }),

  saveButtonDisabled: equal('currentUserPresence', null),

  actions: {
    setPresenceModalState(state) {
      this.set('presenceModalIsOpen', state === 'open');
    },

    deletePresence() {
      this.currentUserPresence.destroyRecord().then(() => {
        this.set('currentUserPresence', null);
      });
    },

    newPresence() {
      if (this.abilities.can('create study-room-presences')) {
        const newPresenceObject = this.store.createRecord(
          'study-room-presence',
          {
            startTime: moment().startOf('minute').toDate(),
            endTime: moment().startOf('minute').add(1, 'hours').toDate(),
            status: 'present',
            user: this.session.currentUser,
          }
        );
        this.set('currentUserPresence', newPresenceObject);
      }
    },

    save() {
      const presence = this.currentUserPresence;
      const fetch = this.fetchData;

      presence.save().then(() => fetch.perform());
      this.set('presenceModalIsOpen', false);
    },
  },
});

export default studyRoomPresence;
