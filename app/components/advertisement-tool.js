import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['advertisement-tool'],
  media: service(),
  advertisements: computed('media.isMobile', 'media.isTablet', 'media.isDesktop', function() {
    if (this.get('media.isMobile') || this.get('media.isTablet')) {
      // Double up the advertisement array to make an 'infinite loop' transition possible
      return this.get('advertisementItems').concat(this.get('advertisementItems'));
    }
    return this.get('advertisementItems');
  }),

  // Don't forget to also increment the 'amountOfAdvertisements' variable
  // in styles/components/advertisement-tool.scss
  advertisementItems: [
    {
      title: 'EasySwitch',
      alt: 'energie vergelijken',
      link: 'https://www.easyswitch.nl/energie-vergelijken/',
      image: 'advertisements/easyswitch.png'
    },
    {
      title: 'Maxilia',
      link: 'https://www.maxilia.nl/',
      image: 'advertisements/maxilia-relatiegeschenken.png'
    },
    {
      title: 'Sponsorkliks',
      link: 'https://www.sponsorkliks.com/products/shops.php?club=4509',
      image: 'advertisements/1.png'
    },
    {
      title: 'Zoover',
      link: 'http://www.zoover.nl',
      image: 'advertisements/2.png'
    },
    {
      title: 'Wasmachine huren bij Meo Lease',
      link: 'http://www.meolease.nl',
      image: 'advertisements/6.gif'
    },
    {
      title: 'Cibdol - Swiss purity',
      link: 'https://www.cibdol.nl/',
      image: 'advertisements/cibdol.gif'
    },
    {
      title: 'Student Wegwijzer',
      link: 'https://www.studentenwegwijzer.nl/',
      image: 'advertisements/3.png'
    },
    {
      title: 'Inshared',
      link: 'https://www.inshared.nl/autoverzekering',
      image: 'advertisements/inshared.png'
    },
    {
      title: 'Geld.nl',
      link: 'https://www.geld.nl/lenen/vergelijken',
      image: 'advertisements/geldnl.png'
    },
    {
      title: 'Traffic Today',
      link: 'https://www.traffictoday.nl/',
      image: 'advertisements/traffic-today.png'
    }
  ]
});
