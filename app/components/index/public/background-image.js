import { classNames, attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

@classNames('index-poster')
@attributeBindings('style')
export default class BackgroundImage extends Component {
  images = [
    '/images/frontpage/feest.jpg',
    '/images/frontpage/gala-diner.jpg',
    '/images/frontpage/gala-groep.jpg',
    '/images/frontpage/skireis.jpg',
    '/images/frontpage/vereniging.jpg',
    '/images/frontpage/vuur.jpg',
  ];

  get style() {
    return htmlSafe(`background-image: url(${this.headerImageUrl})`);
  }

  get headerImageUrl() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
