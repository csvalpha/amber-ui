import Component from '@ember/component';

const ForumPostComponent = Component.extend({
  showMarkdown: false,
  actions: {
    toggleShowMarkdown() {
      this.toggleProperty('showMarkdown');
    },
    quote() {
      let header = `${this.post.author.get('fullName')} schreef op ${moment(
        this.post.createdAt
      ).format('dddd D MMMM gggg @ H:mm')}:`;
      header = `> ___${header}___  \n`;
      let { message } = this.post;
      message = `> ${message}`;
      message = message.split('\n').join('\n> ');
      this.addquote(`${header}${message}`);
    },
  },
});

ForumPostComponent.reopenClass({
  positionalParams: ['post'],
});

export default ForumPostComponent;
