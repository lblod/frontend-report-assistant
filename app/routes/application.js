import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { warn } from '@ember/debug';

export default class ApplicationRoute extends Route {
  @service router;
  @service session;
  @service currentSession;

  async beforeModel() {
    await this.session.setup();
    return this._loadCurrentSession();
  }

  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
}
