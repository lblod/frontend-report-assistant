import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;
  @service currentSession;

  get userName() {
    const user = this.currentSession.user;
    return user && [user.voornaam, user.achternaam].filter(Boolean).join(' ');
  }

  get userOrg() {
    return this.currentSession.user?.group?.naam;
  }

  @action logout() {
    this.session.invalidate();
  }
}
