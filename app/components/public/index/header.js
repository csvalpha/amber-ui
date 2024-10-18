import Component from '@glimmer/component';

export default class Header extends Component {
  images = ['/images/public/banner.jpg'];

  get headerImageUrl() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
