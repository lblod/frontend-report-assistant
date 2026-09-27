import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;

  // conversations checks the login. replaceWith keeps / out of the history,
  // so Back does not bounce to /conversations again.
  beforeModel() {
    this.router.replaceWith('conversations');
  }
}
