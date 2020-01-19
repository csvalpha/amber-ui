import Component from '@ember/component';

const ForumPostComponent = Component.extend({
  showMarkdown: false,
  actions: {
    toggleShowMarkdown() {
      this.toggleProperty('showMarkdown');
    },
    quote() {
      let header = `${this.get('post.author.fullName')} schreef op ${moment(this.get('post.createdAt')).format('dddd D MMMM gggg @ H:mm')}:`;
      header = `> ___${header}___  \n`;
      let message = this.get('post.message');
      message = `> ${message}`;
      message = message.split('\n').join('\n> ');
      this.set('newContent', `${this.newContent}${header}${message} \n\n`);
      this.sendAction('quoteAction');
    }
  }
});

ForumPostComponent.reopenClass({
  positionalParams: ['post']
});

export default ForumPostComponent;
