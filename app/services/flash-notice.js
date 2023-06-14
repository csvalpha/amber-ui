import Service, { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import ENV from 'amber-ui/config/environment';
import { tracked } from '@glimmer/tracking';

export default class FlashNoticeService extends Service {
  @service session;

  @tracked status;
  @tracked content;
  @tracked visibility = false;
  @tracked isPermanent = false;

  sendSuccess(content, isPermanent) {
    this.sendFlashNotice('success', content, isPermanent);
  }

  sendError(content, isPermanent) {
    this.sendFlashNotice('danger', content, isPermanent);
  }

  sendInfo(content, isPermanent) {
    this.sendFlashNotice('info', content, isPermanent);
  }

  sendWarning(content, isPermanent) {
    this.sendFlashNotice('warning', content, isPermanent);
  }

  sendFlashNotice(status, content, isPermanent) {
    this.status = status;
    this.content = content;
    this.isPermanent = isPermanent;
    this.visibility = true;

    if (!isPermanent) {
      let _this = this;
      run.later(
        this,
        function () {
          _this.visibility = false;
        },
        ENV.APP.flashNoticeDefaultDuration
      );
    }
  }

  dismiss() {
    this.visibility = false;
  }
}
