import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

let videos = [
  {
    videoId: 'FCCf0DPGle4',
    title: 'Promo video C.S.V. Alpha',
  },
  {
    videoId: 'x8tGpVON49Q',
    title: "Over C.S.V. Alpha #1 Peter vertelt over de drie V's",
  },
  {
    videoId: 'mjAA02SGnaU',
    title: 'Over C.S.V. Alpha #2 Remco vertelt over kring',
  },
  {
    videoId: 'Z0IIwxAKt6A',
    title: 'Over C.S.V. Alpha #3 Christine vertelt over commissies',
  },
  {
    videoId: 't6CLJOz5ouQ',
    title: 'Over C.S.V. Alpha #4 Laurens vertelt over vorming',
  },
  {
    videoId: 'swBhINBV_RM',
    title: 'Over C.S.V. Alpha #5 David vertelt over onze Sociëteit Flux',
  },
];

export default class YoutubeVideos extends Component {
  @service store;
  mainVideo = videos[0];

  get sideVideos() {
    return videos.filter((video) => video.videoId !== this.mainVideo.videoId);
  }

  @action
  changeVideo(video) {
    this.set('mainVideo', video);
  }
}
