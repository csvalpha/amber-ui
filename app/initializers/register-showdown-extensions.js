import showdown from 'showdown';

export function initialize() {
  showdown.extension('youtubeEmbed', () => {
    const youtubeRegex = /.*(youtu\.|youtube\.).*(\$\(v\/|e\/|u\/\w+\/|embed\/|v=)([\w-]+)\).*/g;
    return [{
      type: 'lang',
      regex: youtubeRegex,
      replace(text) {
        const url = `https://www.youtube.com/embed/${youtubeRegex.exec(text)[3]}`;
        youtubeRegex.lastIndex = 0; // Reset index, see https://stackoverflow.com/questions/4724701/regexp-exec-returns-null-sporadically
        return `<div class="js-video widescreen"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
      }
    }];
  });

  // https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element
  showdown.extension('bootstrapTable', () => {
    return [{
      type: 'output',
      regex: new RegExp('<table(.*)>', 'g'),
      replace: '<table class="table" $1>'
    }];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
