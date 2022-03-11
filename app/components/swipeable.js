import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SwipeableComponent extends Component {
  touching = false;
  swiping = false;
  xStart = null;
  yStart = null;
  xEnd = null;
  yEnd = null;
  @tracked
  swipeDirection = this.args.onSwipeHorizontal
    ? 'horizontal'
    : this.args.onSwipeVertical
    ? 'vertical'
    : null;

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
        if (this.swipeDirection === 'horizontal') {
          // it is reasonable to assume that a swipe should be done mainly in the direction in which can be swiped.
          this.swiping = xDiff ** 2 > yDiff ** 2;
        } else if (this.swipeDirection === 'vertical') {
          this.swiping = yDiff ** 2 > xDiff ** 2;
        } else {
          this.reset();
        }
      }
    }
  }

  doSwipe() {
    if (this.swiping) {
      if (this.swipeDirection === 'horizontal') {
        let direction = this.xEnd - this.xStart;
        direction = direction > 0 ? 1 : -1;
        this.args.onSwipeHorizontal(direction);
      } else if (this.swipeDirection === 'vertical') {
        let direction = this.yEnd - this.yStart;
        direction = direction > 0 ? 1 : -1;
        this.args.onSwipeVertical(direction);
      } else {
        throw 'No swipe direction defined';
      }
    }
  }
}
