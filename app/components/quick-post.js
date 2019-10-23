import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { CanMixin } from 'ember-can';
import { WelcomeTextLines, SuggestedEmojis } from 'alpha-amber/constants';

export default Component.extend(CanMixin, {
  session: service(),
  store: service(),
  messageBus: service(),
  notification: service(),
  init() {
    this._super(...arguments);
    this.set('messages', []);
    if (this.can('show quickpost-messages')) {
      this.send('loadMessages', 1);
      this.send('subscribeToQuickpostMessagesMessageBus');
    }
  },

  newQpMessage: '',

  page: 1,
  totalPages: 1,
  messages: null,

  messagesSort: Object.freeze(['id:desc']),
  sortedMessages: sort('messages', 'messagesSort'),

  maxCharacters: 400,
  currentCharacterCount: computed('newQpMessage', function() {
    return this.get('newQpMessage').length;
  }),
  characterCountPercentage: computed('currentCharacterCount', function() {
    return Math.round(this.get('currentCharacterCount') / this.get('maxCharacters') * 100);
  }),

  progressBarClass: computed('currentCharacterCount', function() {
    const count = this.get('currentCharacterCount');
    const max = this.get('maxCharacters');

    if (count > max) {
      return 'danger';
    } else if (count > 0.8 * max) {
      return 'warning';
    }
    return 'primary';
  }),
  progressBarStyle: computed('characterCountPercentage', function() {
    return htmlSafe(`width: ${this.get('characterCountPercentage')}%`);
  }),

  tooMuchText: computed('currentCharacterCount', function() {
    return this.get('currentCharacterCount') > this.get('maxCharacters');
  }),

  welcomeText: computed(function() {
    return WelcomeTextLines[Math.floor(Math.random() * WelcomeTextLines.length)];
  }),

  emoticons: SuggestedEmojis,

  showLoaderButton: computed('page', 'totalPages', function() {
    return this.get('page') < this.get('totalPages');
  }),

  actions: {
    loadMore() {
      this.send('loadMessages', this.get('page') + 1);
    },

    koeAan(message) {
      // The best easter egg
      if (message === 'KOE AAN!!') {
        const notificationSound = new Audio('/sounds/cow.ogg');
        this.get('notification').set('notificationSound', notificationSound);
        if (this.get('notification.isSoundEnabled')) {
          notificationSound.play();
        }
      }
    },

    appendSmileyToText(emoticon) {
      const currentText = this.get('newQpMessage');
      this.set('newQpMessage', htmlSafe((currentText || '') + emoticon));
      this.get('element').querySelector('#qp-inputfield').focus();
    },

    destroyMessage(message) {
      const answer = confirm('Weet je zeker dat je dit bericht wilt verwijderen?'); // eslint-disable-line no-alert
      if (answer) {
        message.destroyRecord().then(() => {
          this.set('messages', []);
          this.send('loadMessages', 1);
        });
      }
    },

    saveMessage() {
      const message = this.get('newQpMessage');
      if (message && message.length > 0 && !this.get('tooMuchText')) {
        message.trim().replace(/(\r\n|\n|\r)/gm, '');
        this.get('store').createRecord('quickpost-message', { message }).save();

        this.send('koeAan', message);
        this.set('newQpMessage', '');
      }
    },

    loadMessages(page) {
      const pageParams = {};
      pageParams['page[size]'] = 15;
      pageParams['page[number]'] = page;
      pageParams.sort = '-created_at';
      this.get('store').query('quickpost-message', pageParams).then(result => {
        this.get('messages').addObjects(result);
        this.set('totalPages', result.get('meta.page_count'));
      });
      this.set('page', page);
    },

    subscribeToQuickpostMessagesMessageBus() {
      const channel = '/quickpost_messages';
      this.get('messageBus').subscribe(channel, data => {
        const json = JSON.parse(data);
        const quickpostMessageData = {
          data: {
            type: 'quickpost-message',
            id: json.id,
            attributes: {
              message: json.message,
              createdAt: json.created_at
            },
            relationships: {
              author: {
                data: {
                  type: 'user',
                  id: json.author_id
                }
              }
            }
          }
        };
        const quickpost = this.get('store').push(quickpostMessageData);
        this.set('messages', this.get('store').peekAll('quickpostMessage'));
        this.send('notify', quickpost);
      }, null);
    },

    notify(quickpost) {
      if (this.get('notification.isEnabled')
        && quickpost.get('author.id') !== this.get('session.currentUser.id')) {
        this.get('notification').new(
          quickpost.get('author.fullName'),
          quickpost.get('message'),
          quickpost.get('author.avatarThumbUrlOrDefault')
        );
      }
    }
  }
});
