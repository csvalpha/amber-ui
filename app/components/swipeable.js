import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SwipeableComponent extends Component {
  touching = false;
  swiping = false;
  xStart = null;
  yStart = null;
  xEnd = null;
  yEnd = null;
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
    this.swiping = false;
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
      this.xStart = touch.pageX;
      this.yStart = touch.pageY;
    }
  }

  @action
  onTouchEnd(touchEndEvent) {
    if (
      touchEndEvent.targetTouches.length === 0 &&
      touchEndEvent.changedTouches.length === 1 &&
      this.swiping
    ) {
      const touch = touchEndEvent.changedTouches.item(0);
      this.xEnd = touch.pageX;
      this.yEnd = touch.pageY;
      this.doSwipe();
    }

    this.reset();
  }

  @action
  onTouchMove(touchMoveEvent) {
    if (this.touching) {
      if (touchMoveEvent.targetTouches.length === 1) {
        // only do swiping if one finger touches
        // you need to define the swipe actions, even if it's just an empty function
        const touch = touchMoveEvent.targetTouches.item(0);
        const xDiff = touch.pageX - this.xStart;
        const yDiff = touch.pageY - this.yStart;
        if (this.horizontally) {
          // it is reasonable to assume that a swipe should be done mainly in the direction in which can be swiped.
          this.swiping = xDiff ** 2 > 4 * yDiff ** 2;
          this.swiping &&= xDiff ** 2 > this.threshold ** 2;
        } else if (this.vertically) {
          this.swiping = yDiff ** 2 > 4 * xDiff ** 2;
          this.swiping &&= yDiff ** 2 > this.threshold ** 2;
        } else {
          this.throwNoDirection();
          this.reset();
        }
      }
    }
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
