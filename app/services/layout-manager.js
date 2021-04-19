import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LayoutManager extends Service {
  @service media
  @service session
  @service localStorage

  @tracked profileMenuOpen;
  @tracked _leftSideBarOverride;
  @tracked _leftSideBarExpandedTick;

  get leftSideBarOpen() {
    if (this._leftSideBarOverride) {
      return true;
    }

    return !this.media.isMobile && this.session.isAuthenticated;
  }

  set leftSideBarOpen(value) {
    this._leftSideBarOverride = value;
  }

  get leftSideBarExpanded() {
    // eslint-disable-next-line no-unused-vars
    let x = this._leftSideBarExpandedTick; // call the value to make this recompute on set.
    if (this.media.isMobile) {
      return true;
    }

    // On non-mobile it is optional according to localstorage
    // localstorage stores it as a string
    return this.localStorage.getItem('leftSideBarExpanded') === 'true';
  }

  set leftSideBarExpanded(value) {
    this.localStorage.setItem('leftSideBarExpanded', value);
    this._leftSideBarExpandedTick = !this._leftSideBarExpandedTick;
  }

  @action
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  @action
  closeProfileMenu() {
    this.profileMenuOpen = false;
  }

  @action
  toggleLeftSidebar() {
    this.leftSideBarOpen = !this.leftSideBarOpen;
  }

  @action
  closeLeftSidebar() {
    this.leftSideBarOpen = false;
  }

  @action
  toggleLeftSidebarExpansion() {
    this.leftSideBarExpanded = !this.leftSideBarExpanded;
  }

  @action
  closeLeftSidebarIfOnMobile() {
    if (this.media.isMobile) {
      this.leftSideBarOpen = false;
    }
  }
}
