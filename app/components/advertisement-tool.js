import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['advertisement-tool'],
  media: service(),
  advertisements: computed('advertisementItems', 'media.{isDesktop,isMobile,isTablet}', function() {
    // Double up the advertisement array to make an 'infinite loop' transition possible
    return this.advertisementItems.concat(this.advertisementItems);
  }),

  // Don't forget to also increment the 'amountOfAdvertisements' variable
  // in styles/components/advertisement-tool.scss
  advertisementItems: [
    {
      title: 'Knaek',
      alt: 'Onbeperkt geld besparen met de studentenkortingsapp op meer dan 1.000 locaties en online',
      link: 'https://www.knaek.nl/studentenkorting/Enschede',
      image: 'advertisements/knaek.png'
    },
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
      image: 'advertisements/sponsorkliks.png'
    },
    {
      title: 'Wasmachine huren bij Meo Lease',
      link: 'http://www.meolease.nl',
      image: 'advertisements/meolease.gif'
    },
    {
      title: 'Bierglazen bedrukken met logo',
      alt: 'Bierglazen bedrukken met logo',
      link: 'https://www.rikegroup.com/glazen-bedrukken/bierglazen-bedrukken',
      image: 'advertisements/rike.png'
    },
    {
      title: 'Cibdol - Swiss purity',
      link: 'https://www.cibdol.nl/',
      image: 'advertisements/cibdol.gif'
    },
    {
      title: 'Student Wegwijzer',
      link: 'https://www.studentenwegwijzer.nl/',
      image: 'advertisements/studentwegwijzer.png'
    },
    {
      title: 'SKEPP B.V.',
      link: 'https://skepp.nl/nl/',
      image: 'advertisements/skepp.png'
    }
  ]
});
