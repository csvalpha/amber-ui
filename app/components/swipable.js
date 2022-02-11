import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';


export default class SwipableComponent extends Component {
  touching = false
  swiping = false
  x_start = null
  y_start = null
  x_end = null
  y_end = null
  @tracked
  swipe_direction = this.args.onSwipeHorizontal ? 'horizontal' : (this.args.onSwipeVertical ? 'vertical' : null)

  reset() {
    this.touching = false
    this.swiping = false
    this.x_start = null
    this.y_start = null
    this.x_end = null
    this.y_end = null
  }

  @action
  onTouchStart(touchStartEvent) {
    if (touchStartEvent.targetTouches.length === 1) {
      this.touching = true
      let touch = touchStartEvent.targetTouches.item(0)
      this.x_start = touch.pageX
      this.y_start = touch.pageY
    }
  }

  @action
  onTouchEnd(touchEndEvent) {
    if (touchEndEvent.targetTouches.length === 0 && touchEndEvent.changedTouches.length === 1 && this.swiping) {
      let touch = touchEndEvent.changedTouches.item(0)
      this.x_end = touch.pageX
      this.y_end = touch.pageY
      this.doSwipe()
    }
    this.reset()
  }

  @action
  onTouchMove(touchMoveEvent) {
    console.log('touch move')
    if (this.touching) {
      if (touchMoveEvent.targetTouches.length === 1) { // only do swiping if one finger touches
        // you need to define the swipe actions, even if it's just an empty function
        let touch = touchMoveEvent.targetTouches.item(0)
        let x_diff = touch.pageX - this.x_start
        let y_diff = touch.pageY - this.y_start
        if (this.swipe_direction === 'horizontal') {
          // it is reasonable to assume that a swipe should be done mainly in the direction in which can be swiped.
          this.swiping = x_diff ** 2 > y_diff ** 2;
        } else if (this.swipe_direction === 'vertical') {
          this.swiping = y_diff ** 2 > x_diff ** 2;
        } else {
          this.reset()
        }
      }
    }
  }

  doSwipe() {
    console.log('do swipe')
    if (this.swiping) {
      if (this.swipe_direction === 'horizontal') {
        let direction = this.x_end - this.x_start
        direction = direction > 0 ? 1 : -1
        this.args.onSwipeHorizontal(direction)
      } else if (this.swipe_direction === 'vertical') {
        let direction = this.y_end - this.y_start
        direction = direction > 0 ? 1 : -1
        this.args.onSwipeVertical(direction)
      } else {
        throw "No swipe direction defined"
      }
    }
  }
}
