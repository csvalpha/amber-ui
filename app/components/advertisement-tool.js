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
      image: 'advertisements/Qorting.png',
      full: true,
    },
    {
      title: 'Sponsorkliks',
      link: 'https://www.sponsorkliks.com/products/shops.php?club=4509',
      image: 'advertisements/SponsorKliks.png',
      full: true,
    },
    {
      title: 'Boeketcadeau',
      link: 'https://www.boeketcadeau.nl/',
      image: 'advertisements/BoeketCadeau.png',
    },
    {
      title: 'Comfort Producten',
      link: 'https://www.comfort-producten.nl/nl/',
      image: 'advertisements/ComfortProducts.png',
    },
    {
      title: 'Huurzone',
      link: 'https://www.huurzone.nl/aanbod/nederland.html',
      image: 'advertisements/Huurzone.png',
    },
    {
      title: 'Inshared',
      link: 'https://www.inshared.nl/',
      image: 'advertisements/Inshared.png',
    },
    {
      title: 'Bierglazen bedrukken met logo',
      alt: 'Bierglazen bedrukken met logo',
      link: 'https://www.rikegroup.com/glazen-bedrukken/bierglazen-bedrukken',
      image: 'advertisements/Rike_2022.png',
    },
    {
      title: 'Rotimshop',
      link: 'https://www.rotimshop.nl/',
      image: 'advertisements/RotimShop.png',
    },
    {
      title: 'Traffic Today',
      link: 'https://www.traffictoday.nl/',
      image: 'advertisements/TrafficToday.png',
    },
  ],
});
