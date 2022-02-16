import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class PageNumbers extends Component {
  @tracked info;

  pagesToShow = 5;

  get currentPage() {
    return parseInt(this.info.page, 10);
  }

  get totalPages() {
    return parseInt(this.info.totalPages, 10);
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get pageItems() {
    let result = [];
    let before = parseInt(this.pagesToShow / 2);
    if (this.currentPage - before < 1) {
      before = this.currentPage - 1;
    }

    let after = this.pagesToShow - before - 1;
    if (this.totalPages - this.currentPage < after) {
      after = this.totalPages - this.currentPage;
      before = this.pagesToShow - after - 1;
    }

    if (this.currentPage - before < 1) {
      before = this.currentPage - 1;
    }

    // If we need to show first
    if (this.currentPage - before > 1) {
      result.push({ page: 1 });
    }

    if (this.currentPage - before > 2) {
      result.push({ page: this.currentPage - before, dots: true });
      before -= 1;
    }

    // Add before
    for (let i = this.currentPage - before; i < this.currentPage; i++) {
      result.push({ page: i });
    }

    // Add current
    result.push({ page: this.currentPage, current: true });

    // Add after
    for (let i = this.currentPage + 1; i <= this.currentPage + after; i++) {
      result.push({ page: i });
    }

    if (this.totalPages > this.currentPage + after) {
      const dots = this.currentPage + after + 1 < this.totalPages;
      result.push({ page: this.totalPages, dots });
    }

    return result;
  }

  get canStepBackward() {
    return this.currentPage > 1;
  }

  get canStepForward() {
    return this.currentPage < this.totalPages;
  }
}
