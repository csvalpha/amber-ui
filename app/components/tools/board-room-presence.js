import { equal } from '@ember/object/computed';
import Ember from 'ember';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const BoardRoomPresence = Component.extend({
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

  // Periodically poll for new boardroom data
  poll: task(function* () {
    // eslint-disable-next-line ember-suave/no-direct-property-access
    while (!Ember.testing) {
      this.fetchData.perform();
      yield timeout(1000 * 30); // Wait 30 seconds
    }
  })
    .drop()
    .on('didInsertElement'),

  // Fetch task is seperate from polling task, so we can call it individually
  fetchData: task(function* () {
    // eslint-disable-next-line camelcase
    const model = yield this.store.query('board-room-presence', {
      filter: { current_and_future: true },
    });

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
      if (this.abilities.can('create board-room-presences')) {
        const newPresenceObject = this.store.createRecord(
          'board-room-presence',
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

export default BoardRoomPresence;
