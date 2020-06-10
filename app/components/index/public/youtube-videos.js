import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

let videos = [
  {
    videoId: 'FCCf0DPGle4',
    title: 'Promo video C.S.V. Alpha'
  },
  {
    videoId: 'x8tGpVON49Q',
    title: 'Over C.S.V. Alpha #1 Peter vertelt over de drie V\'s'
  },
  {
    videoId: 'mjAA02SGnaU',
    title: 'Over C.S.V. Alpha #2 Remco vertelt over kring'
  },
  {
    videoId: 'Z0IIwxAKt6A',
    title: 'Over C.S.V. Alpha #3 Christine vertelt over commissies'
  }
];

export default class YoutubeVideos extends Component {
  @service store;
  mainVideo = videos[0];

  get sideVideos() {
    return videos.filter(video => video.videoId !== this.mainVideo.videoId);
  }

  @action
  changeVideo(video) {
    this.set('mainVideo', video);
  }
}
