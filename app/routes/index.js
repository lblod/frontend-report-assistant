import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;

  // conversations checks the login.
  beforeModel() {
    this.router.transitionTo('conversations');
  }
}
