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
      title: 'Knaek',
      alt: 'Onbeperkt geld besparen met de studentenkortingsapp op meer dan 1.000 locaties en online',
      link: 'https://www.knaek.nl/studentenkorting/Enschede',
      image: 'advertisements/knaek.png',
      full: true,
    },
    {
      title: 'EasySwitch',
      alt: 'energie vergelijken',
      link: 'https://www.easyswitch.nl/energie-vergelijken/',
      image: 'advertisements/easyswitch.png',
      full: true,
    },
    {
      title: 'Maxilia',
      link: 'https://www.maxilia.nl/',
      image: 'advertisements/maxilia-relatiegeschenken.png',
      full: true,
    },
    {
      title: 'Sponsorkliks',
      link: 'https://www.sponsorkliks.com/products/shops.php?club=4509',
      image: 'advertisements/sponsorkliks.png',
      full: true,
    },
    {
      title: 'Wasmachine huren bij Meo Lease',
      link: 'http://www.meolease.nl',
      image: 'advertisements/meolease.gif',
      full: true,
    },
    {
      title: 'Bierglazen bedrukken met logo',
      alt: 'Bierglazen bedrukken met logo',
      link: 'https://www.rikegroup.com/glazen-bedrukken/bierglazen-bedrukken',
      image: 'advertisements/rike.png',
      full: true,
    },
    {
      title: 'Cibdol - Swiss purity',
      link: 'https://www.cibdol.nl/',
      image: 'advertisements/cibdol.gif',
      full: true,
    },
    {
      title: 'Student Wegwijzer',
      link: 'https://www.studentenwegwijzer.nl/',
      image: 'advertisements/studentwegwijzer.png',
      full: true,
    },
    {
      title: 'SKEPP B.V.',
      link: 'https://skepp.nl/nl/',
      image: 'advertisements/skepp.png',
      full: true,
    },
    {
      title: 'Parcelpro',
      link: 'https://parcelpro.nl/',
      image: 'advertisements/parcelpro.png',
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
      links: [
        {
          link: 'https://www.simonlydiscount.nl',
          title: 'sim only vergelijken',
        },
        {
          link: 'https://www.huurzone.nl/aanbod/nederland.html',
          title: 'huurwoningen',
        },
        {
          link: 'https://www.opzeggen24.nl/abonnement-opzeggen/telegraaf-opzeggen.html',
          title: 'telegraaf opzeggen',
        },
      ],
    },
  ],
});
