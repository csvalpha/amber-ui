import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['advertisement-tool'],
  media: service(),
  advertisements: computed(
    'advertisementItems',
    'media.{isDesktop,isMobile,isTablet}',
    function () {
      // Double up the advertisement array to make an 'infinite loop' transition possible
      return this.advertisementItems.concat(this.advertisementItems);
    }
  ),

  // Don't forget to also increment the 'amountOfAdvertisements' variable in
  // styles/components/advertisement-tool.scss and the number of advertisements
  // in tests/rendering/components/advertisement-tool-test.js
  advertisementItems: [
    {
      title: 'Qorting.nl',
      link: 'https://qorting.nl/',
      image: 'advertisements/qorting.png',
      full: true,
    },
    {
      title: 'Sponsorkliks',
      link: 'https://www.sponsorkliks.com/products/shops.php?club=4509',
      image: 'advertisements/sponsorkliks.png',
      full: true,
    },
    {
      title: 'Cibdol - Swiss purity',
      link: 'https://www.cibdol.nl/',
      image: 'advertisements/cibdol.gif',
      full: true,
    },
    {
      title: 'InShared',
      link: 'https://www.inshared.nl/',
      image: 'advertisements/inshared.png',
    },
    {
      title: 'Led24',
      link: 'https://www.led24.nl/led-verlichting/led-tl-buis/',
      image: 'advertisements/led24.png',
    },
    {
      title: 'Noppies',
      link: 'https://www.noppies.com/',
      image: 'advertisements/noppies.png',
    },
    {
      title: 'Rotimshop',
      link: 'https://www.rotimshop.nl/',
      image: 'advertisements/rotim.png',
    },
    {
      title: 'Sans Online',
      link: 'https://www.sans-online.nl/herenkleding/jassen/',
      image: 'advertisements/sans.png',
    },
    {
      title: 'Sliponline',
      link: 'https://www.sliponline.nl/kinderen/kinder-nachtkleding/kinder-pyjama/',
      image: 'advertisements/sliponline.png',
    },
    {
      title: 'Stellingstunt',
      link: 'https://www.stellingstunt.nl/',
      image: 'advertisements/stellingstunt.png',
    },
    {
      title: 'Baktotaal Bouwhuis',
      link: 'https://www.bouwhuis.com/',
      image: 'advertisements/bouwhuis.png',
    },
    {
      title: 'Shops United',
      link: 'https://shops-united.nl/',
      image: 'advertisements/shops-united.png',
    },
    {
      title: 'Urbansofa',
      link: 'https://www.urbansofa.nl/',
      image: 'advertisements/urbansofa.png',
    },
    {
      title: 'Prefixbroker',
      link: 'https://www.prefixbroker.com/',
      image: 'advertisements/prefixbroker.png',
    },
    {
      title: 'Van Eyck Shutters',
      link: 'https://www.vaneyckshutters.com/',
      image: 'advertisements/van-eyck.png',
    },
    {
      title: 'Verzekering.nl',
      link: 'https://www.verzekering.nl/',
      image: 'advertisements/verzekering.png',
    },
    {
      title: 'Zantman Kliniek',
      link: 'https://www.zantmankliniek.nl/',
      image: 'advertisements/zantman.png',
    },
    {
      title: 'Bierglazen bedrukken met logo',
      alt: 'Bierglazen bedrukken met logo',
      link: 'https://www.rikegroup.com/glazen-bedrukken/bierglazen-bedrukken',
      image: 'advertisements/rike.png',
    },
    {
      links: [
        {
          link: 'https://www.huurzone.nl/aanbod/nederland.html',
          title: 'huurwoningen',
        },
      ],
    },
    {
      title: 'Top 5 Beste Kopen',
      alt: 'Vergelijk de beste producten',
      link: 'https://www.top5bestekopen.nl',
      image: 'advertisements/trendiq.jpg',
    },
  ],
});
