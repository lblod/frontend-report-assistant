import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;
  @service currentSession;
  @service impersonation;

  // While an admin acts as a bestuur, the header still names the admin; the
  // impersonation menu names the bestuur.
  get userName() {
    const user = this.impersonation.isImpersonating
      ? this.impersonation.originalAccount.belongsTo('gebruiker').value()
      : this.currentSession.user;
    return user?.fullName;
  }

  get userOrg() {
    return this.impersonation.isImpersonating
      ? this.impersonation.originalGroup?.naam
      : this.currentSession.user?.group?.naam;
  }

  @action logout() {
    this.session.invalidate();
  }
}
