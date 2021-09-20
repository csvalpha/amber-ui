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
      image: 'advertisements/knaek.png',
      full: true
    },
    {
      title: 'EasySwitch',
      alt: 'energie vergelijken',
      link: 'https://www.easyswitch.nl/energie-vergelijken/',
      image: 'advertisements/easyswitch.png',
      full: true
    },
    {
      title: 'Maxilia',
      link: 'https://www.maxilia.nl/',
      image: 'advertisements/maxilia-relatiegeschenken.png',
      full: true
    },
    {
      title: 'Sponsorkliks',
      link: 'https://www.sponsorkliks.com/products/shops.php?club=4509',
      image: 'advertisements/sponsorkliks.png',
      full: true
    },
    {
      title: 'Wasmachine huren bij Meo Lease',
      link: 'http://www.meolease.nl',
      image: 'advertisements/meolease.gif',
      full: true
    },
    {
      title: 'Bierglazen bedrukken met logo',
      alt: 'Bierglazen bedrukken met logo',
      link: 'https://www.rikegroup.com/glazen-bedrukken/bierglazen-bedrukken',
      image: 'advertisements/rike.png',
      full: true
    },
    {
      title: 'Cibdol - Swiss purity',
      link: 'https://www.cibdol.nl/',
      image: 'advertisements/cibdol.gif',
      full: true
    },
    {
      title: 'Student Wegwijzer',
      link: 'https://www.studentenwegwijzer.nl/',
      image: 'advertisements/studentwegwijzer.png',
      full: true
    },
    {
      title: 'SKEPP B.V.',
      link: 'https://skepp.nl/nl/',
      image: 'advertisements/skepp.png',
      full: true
    },
    {
      title: 'Sans Online',
      link: 'https://www.sans-online.nl/dameskleding/jurken/',
      image: 'advertisements/sans.png'
    },
    {
      title: 'Boeketcadeau',
      link: 'https://www.boeketcadeau.nl/',
      image: 'advertisements/boeketcadeau.png'
    },
    {
      title: 'Hekwerkonline',
      link: 'https://www.hekwerkonline.nl/',
      image: 'advertisements/hekwerkonline.png'
    },
    {
      title: 'InShared',
      link: 'https://www.inshared.nl/',
      image: 'advertisements/inshared.png'
    },
    {
      title: 'Sani4all',
      link: 'https://www.sani4all.nl/',
      image: 'advertisements/sani4all.png'
    },
    {
      title: 'Schattige babykleertjes',
      link: 'https://www.schattigebabykleertjes.nl/',
      image: 'advertisements/schattige-babykleertjes.png'
    },
    {
      title: 'Sfeer.nl',
      link: 'https://www.sfeer.nl/',
      image: 'advertisements/sfeer.png'
    },
    {
      title: 'Shops United',
      link: 'https://shops-united.nl/',
      image: 'advertisements/shops-united.png'
    },
    {
      title: 'Sliponline',
      link: 'https://www.sliponline.nl/',
      image: 'advertisements/sliponline.png'
    },
    {
      title: 'Regiobloemist',
      link: 'https://www.regiobloemist.nl',
      image: 'advertisements/regiobloemist.png'
    },
    {
      title: 'BeBo Parket',
      link: 'https://www.beboparket.nl/',
      image: 'advertisements/bebo-parket.png'
    },
    {
      title: 'Superfoodies',
      link: 'https://superfoodies.nl/',
      image: 'advertisements/superfoodies.png'
    },
    {
      title: 'Wifimedia',
      link: 'https://www.wifimedia.eu/',
      image: 'advertisements/wifimedia.png'
    },
    {
      title: 'Maxiaxi',
      link: 'https://www.maxiaxi.com',
      image: 'advertisements/maxiaxi.png'
    },
    {
      title: 'Traffic Today',
      link: 'https://www.traffictoday.nl/',
      image: 'advertisements/traffic-today.png'
    },
    {
      links: [
        {
          link: 'https://www.simonlydiscount.nl',
          title: 'sim only vergelijken'
        },
        {
          link: 'https://www.huurzone.nl/aanbod/nederland.html',
          title: 'huurwoningen'
        },
        {
          link: 'https://www.opzeggen24.nl/abonnement-opzeggen/telegraaf-opzeggen.html',
          title: 'telegraaf opzeggen'
        }
      ]
    }
  ]
});
