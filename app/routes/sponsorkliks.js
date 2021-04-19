import Route from '@ember/routing/route';

export default class SponsorkliksRoute extends Route {
  redirect() {
    window.location.replace('https://www.sponsorkliks.com/products/shops.php?club=4509');
  }
}
