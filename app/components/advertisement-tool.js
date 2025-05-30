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
      title: 'BeBo Parket',
      link: 'https://www.beboparket.nl/',
      image: 'advertisements/BeBo.png',
    },
    {
      title: 'Boeketcadeau',
      link: 'https://www.boeketcadeau.nl/',
      image: 'advertisements/BoeketCadeau.png',
    },
    {
      title: 'Baktotaal',
      link: 'https://www.baktotaal.nl/',
      image: 'advertisements/Baktotaal.png',
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
      title: 'Ledlampenkopen.nu',
      link: 'https://www.ledlampenkopen.nu/',
      image: 'advertisements/LedlampenKopen.png',
    },
    {
      title: 'Parcel Pro',
      link: 'https://parcelpro.nl/',
      image: 'advertisements/ParcelPro.png',
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
      title: 'Shops United',
      link: 'https://shops-united.nl/',
      image: 'advertisements/ShopsUnited.png',
    },
    {
      title: 'Sleiderink',
      link: 'https://www.sleiderink.nl/',
      image: 'advertisements/Sleiderink.png',
    },
    {
      title: 'Sliponline',
      link: 'https://www.sliponline.nl/kinderen/kinder-nachtkleding/kinder-pyjama/',
      image: 'advertisements/SlipOnline.png',
    },
    {
      title: 'Stellingstunt',
      link: 'https://www.stellingstunt.nl/',
      image: 'advertisements/StellingStunt.png',
    },
    {
      title: 'Traffic Today',
      link: 'https://www.traffictoday.nl/',
      image: 'advertisements/TrafficToday.jpg',
    },
    {
      title: 'Verzekering',
      link: 'https://www.verzekering.nl/',
      image: 'advertisements/VerzekeringNL.png',
    },
    {
      title: 'Visser & Visser',
      link: 'https://www.visserenvisser.nl/',
      image: 'advertisements/Visser&Visser.png',
    },
  ],
});
