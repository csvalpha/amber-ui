import Component from '@ember/component';

export default class Header extends Component {
  images = ['/images/frontpage/banner.jpg'];

  get headerImageUrl() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}