import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    window.location.replace('https://www.sponsorkliks.com/products/shops.php?club=4509');
  }
});
