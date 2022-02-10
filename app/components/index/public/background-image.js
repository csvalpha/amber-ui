import { classNames, attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

@classNames('index-poster')
@attributeBindings('style')
export default class BackgroundImage extends Component {
  images = [
    '/images/frontpage/serious.jpg',
    '/images/frontpage/smile.jpg',
    '/images/frontpage/dance.jpg',
    '/images/frontpage/fire.jpg',
  ];

  get style() {
    return htmlSafe(`background-image: url(${this.headerImageUrl})`);
  }

  get headerImageUrl() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
