import $ from 'jquery';
import PageNumbersComponent from 'ember-cli-pagination/components/page-numbers';

export default PageNumbersComponent.extend({
  numPagesToShow: 5,
  showFL: true,
  actions: {
    pageClicked(number) {
      this._super(number);
      $('.app').scrollTop(0);
    }
  }
});
