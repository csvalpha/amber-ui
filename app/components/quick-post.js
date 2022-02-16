import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort, reads } from '@ember/object/computed';
import { WelcomeTextLines, SuggestedEmojis } from 'alpha-amber/constants';
import { convertToUnicode } from 'alpha-amber/helpers/convert-to-unicode';

export default Component.extend({
  session: service(),
  store: service(),
  messageBus: service(),
  notification: service(),
  abilities: service(),
  init() {
    this._super(...arguments);
    this.set('messages', []);
    if (this.abilities.can('show quickpost-messages')) {
      this.send('loadMessages', 1);
      this.send('subscribeToQuickpostMessagesMessageBus');
    }
  },

  newQpMessage: '',

  page: 1,
  totalPages: 1,
  messages: null,

  messagesSort: Object.freeze(['created_at:desc']),
  sortedMessages: sort('messages', 'messagesSort'),

  maxCharacters: 400,
  currentCharacterCount: reads('newQpMessage.length'),
  characterCountPercentage: computed(
    'currentCharacterCount',
    'maxCharacters',
    function () {
      return Math.round(
        (this.currentCharacterCount / this.maxCharacters) * 100
      );
    }
  ),

  progressBarClass: computed(
    'currentCharacterCount',
    'maxCharacters',
    function () {
      const count = this.currentCharacterCount;
      const max = this.maxCharacters;

      if (count > max) {
        return 'danger';
      } else if (count > 0.8 * max) {
        return 'warning';
      }

      return 'primary';
    }
  ),
  progressBarStyle: computed('characterCountPercentage', function () {
    return htmlSafe(`width: ${this.characterCountPercentage}%`);
  }),

  tooMuchText: computed('currentCharacterCount', 'maxCharacters', function () {
    return this.currentCharacterCount > this.maxCharacters;
  }),

  welcomeText: computed(function () {
    return WelcomeTextLines[
      Math.floor(Math.random() * WelcomeTextLines.length)
    ];
  }),

  emoticons: SuggestedEmojis,

  showLoaderButton: computed('page', 'totalPages', function () {
    return this.page < this.totalPages;
  }),

  actions: {
    loadMore() {
      this.send('loadMessages', this.page + 1);
    },

    koeAan(message) {
      // The best easter egg
      if (message === 'KOE AAN!!') {
        const notificationSound = new Audio('/sounds/cow.ogg');
        this.notification.set('notificationSound', notificationSound);
        if (this.notification.isSoundEnabled) {
          notificationSound.play();
        }
      }
    },

    appendSmileyToText(emoticon) {
      const currentText = this.newQpMessage;
      this.set('newQpMessage', htmlSafe((currentText || '') + emoticon));
      this.element.querySelector('#qp-inputfield').focus();
    },

    destroyMessage(message) {
      const answer = confirm(
        'Weet je zeker dat je dit bericht wilt verwijderen?'
      ); // eslint-disable-line no-alert
      if (answer) {
        message.destroyRecord().then(() => {
          this.set('messages', []);
          this.send('loadMessages', 1);
        });
      }
    },

    saveMessage() {
      const message = this.newQpMessage;
      if (message && message.length > 0 && !this.tooMuchText) {
        message.trim().replace(/(\r\n|\n|\r)/gm, '');
        const unicodeMessage = convertToUnicode(message);

        this.store
          .createRecord('quickpost-message', { message: unicodeMessage })
          .save();

        this.send('koeAan', unicodeMessage);
        this.set('newQpMessage', '');
      }
    },

    loadMessages(page) {
      const pageParams = {};
      pageParams['page[size]'] = 15;
      pageParams['page[number]'] = page;
      pageParams.sort = '-created_at';
      this.store.query('quickpost-message', pageParams).then((result) => {
        this.messages.addObjects(result);
        this.set('totalPages', result.get('meta.page_count'));
      });
      this.set('page', page);
    },

    subscribeToQuickpostMessagesMessageBus() {
      const channel = '/quickpost_messages';
      this.messageBus.subscribe(
        channel,
        (data) => {
          const json = JSON.parse(data);
          const quickpostMessageData = {
            data: {
              type: 'quickpost-message',
              id: json.id,
              attributes: {
                message: json.message,
                createdAt: json.created_at,
              },
              relationships: {
                author: {
                  data: {
                    type: 'user',
                    id: json.author_id,
                  },
                },
              },
            },
          };
          const quickpost = this.store.push(quickpostMessageData);
          this.set('messages', this.store.peekAll('quickpostMessage'));
          this.send('notify', quickpost);
        },
        null
      );
    },

    notify(quickpost) {
      if (
        this.notification.isEnabled &&
        quickpost.get('author.id') !== this.session.currentUser.id
      ) {
        this.notification.new(
          quickpost.get('author.fullName'),
          quickpost.get('message'),
          quickpost.get('author.avatarThumbUrlOrDefault')
        );
      }
    },
  },
});
