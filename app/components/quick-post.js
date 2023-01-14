import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { WelcomeTextLines, SuggestedEmojis } from 'amber-ui/constants';
import { convertToUnicode } from 'amber-ui/helpers/convert-to-unicode';

export default class QuickPost extends Component {
  @service session;
  @service store;
  @service messageBus;
  @service notification;
  @service abilities;

  @tracked newQpMessage = '';
  @tracked page = 1;
  @tracked totalPages = 1;
  @tracked messages = [];
  maxCharacters = 400;
  emoticons = SuggestedEmojis;

  get sortedMessages() {
    return this.messages
      .map((message) => message) // turn the RecordArray into a js array to allow sorting
      .sort((a, b) => -('' + a.createdAt).localeCompare(b.createdAt));
  }

  get currentCharacterCount() {
    return this.newQpMessage.length;
  }

  constructor() {
    super(...arguments);
    if (this.abilities.can('show quickpost-messages')) {
      this.loadMessages(1);
      this.subscribeToQuickpostMessagesMessageBus();
    }
  }

  get characterCountPercentage() {
    return Math.round((this.currentCharacterCount / this.maxCharacters) * 100);
  }

  get progressBarClass() {
    const count = this.currentCharacterCount;
    const max = this.maxCharacters;
    if (count > max) {
      return 'danger';
    } else if (count > 0.8 * max) {
      return 'warning';
    }
    return 'primary';
  }

  get progressBarStyle() {
    return htmlSafe(`width: ${this.characterCountPercentage}%`);
  }

  get tooMuchText() {
    return this.currentCharacterCount > this.maxCharacters;
  }

  get welcomeText() {
    return WelcomeTextLines[
      Math.floor(Math.random() * WelcomeTextLines.length)
    ];
  }

  get showLoaderButton() {
    return this.page < this.totalPages;
  }

  @action
  loadMore() {
    this.send('loadMessages', this.page + 1);
  }

  @action
  koeAan(message) {
    // The best easter egg
    if (message === 'KOE AAN!!') {
      const notificationSound = new Audio('/sounds/cow.ogg');
      this.notification.set('notificationSound', notificationSound);
      if (this.notification.isSoundEnabled) {
        notificationSound.play();
      }
    }
  }

  @action
  appendSmileyToText(emoticon) {
    const currentText = this.newQpMessage;
    this.newQpMessage = htmlSafe((currentText || '') + emoticon);
    this.element.querySelector('#qp-inputfield').focus();
  }

  @action
  destroyMessage(message) {
    const answer = confirm(
      'Weet je zeker dat je dit bericht wilt verwijderen?'
    ); // eslint-disable-line no-alert
    if (answer) {
      message.destroyRecord().then(() => {
        this.messages = [];
        this.loadMessages(1);
      });
    }
  }

  @action
  saveMessage() {
    const message = this.newQpMessage;
    if (message && message.length > 0 && !this.tooMuchText) {
      message.trim().replace(/(\r\n|\n|\r)/gm, '');
      const unicodeMessage = convertToUnicode(message);

      this.store
        .createRecord('quickpost-message', { message: unicodeMessage })
        .save();
      this.koeAan(unicodeMessage);
      this.newQpMessage = '';
    }
  }

  @action
  async loadMessages(page) {
    const pageParams = {};
    pageParams['page[size]'] = 15;
    pageParams['page[number]'] = page;
    pageParams.sort = '-created_at';
    const result = await this.store.query('quickpost-message', pageParams);
    this.totalPages = result.get('meta.page_count');
    this.messages = this.store.peekAll('quickpost-message');
    this.page = page;
  }

  @action
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
        console.debug(quickpostMessageData);
        console.debug(this.store.peekAll('quickpost-message'));
        const quickpost = this.store.push(quickpostMessageData);
        console.debug(this.store.peekAll('quickpost-message'));
        this.notify(quickpost);
      },
      null
    );
  }

  @action
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
  }
}
