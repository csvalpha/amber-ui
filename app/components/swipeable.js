import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SwipeableComponent extends Component {
  @tracked touching = false;
  @tracked xStart = null;
  @tracked yStart = null;
  @tracked xEnd = null;
  @tracked yEnd = null;
  horizontally = !!this.args.onSwipeHorizontal;
  vertically = !!this.args.onSwipeVertical;
  onSwipe = this.args.onSwipeHorizontal ?? this.args.onSwipeVertical ?? null;
  // pixel threshold. expects argument to be passed as percentage
  threshold =
    ((this.args.threshold ?? 25) / 100) *
    (this.horizontally
      ? window.screen.availWidth
      : this.vertically
      ? window.screen.availHeight
      : null);

  reset() {
    this.touching = false;
    this.xStart = null;
    this.yStart = null;
    this.xEnd = null;
    this.yEnd = null;
  }

  @action
  onTouchStart(touchStartEvent) {
    if (touchStartEvent.targetTouches.length === 1) {
      this.touching = true;
      const touch = touchStartEvent.targetTouches.item(0);
      this.xStart = touch.screenX;
      this.yStart = touch.screenY;
    }
  }

  @action
  onTouchEnd(touchEndEvent) {
    if (
      touchEndEvent.targetTouches.length === 0 &&
      touchEndEvent.changedTouches.length === 1
    ) {
      const touch = touchEndEvent.changedTouches.item(0);
      this.xEnd = touch.screenX;
      this.yEnd = touch.screenY;
      if (this.swiping) {
        this.doSwipe();
      }
    }
    this.reset();
  }

  get swiping() {
    let swiping = false;
    if (this.touching) {
      const xDiff = this.xEnd - this.xStart;
      const yDiff = this.yEnd - this.yStart;
      if (this.horizontally) {
        swiping = xDiff ** 2 > (4 * yDiff) ** 2;
        swiping &&= xDiff ** 2 > this.threshold ** 2;
      } else if (this.vertically) {
        swiping = yDiff ** 2 > (4 * xDiff) ** 2;
        swiping &&= yDiff ** 2 > this.threshold ** 2;
      } else {
        this.throwNoDirection();
      }
    }
    return swiping;
  }

  doSwipe() {
    if (this.swiping) {
      let direction = 0;
      if (this.horizontally) {
        direction = this.xEnd - this.xStart;
      } else if (this.vertically) {
        direction = this.yEnd - this.yStart;
      } else {
        this.throwNoDirection();
      }
      direction = Math.sign(direction);
      this.onSwipe(direction);
    }
  }

  throwNoDirection() {
    throw new Error('No swipe direction defined');
  }
}
