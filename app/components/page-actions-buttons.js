import Component from '@ember/component';

const PageActionsButtonsComponent = Component.extend({
  tagName: 'span',
  classNames:
    'page-actions-buttons col col-md-auto row g-0 flex-wrap justify-content-end p-0',
});

PageActionsButtonsComponent.reopenClass({
  positionalParams: ['pageActions'],
});

export default PageActionsButtonsComponent;
