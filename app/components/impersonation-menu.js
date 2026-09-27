import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ImpersonationMenu extends Component {
  @service currentSession;
  @service impersonation;

  get isImpersonating() {
    return this.impersonation.isImpersonating;
  }

  get label() {
    return this.isImpersonating
      ? `Admin: ${this.currentSession.user?.fullName}`
      : 'Admin';
  }

  @action async stopImpersonation() {
    await this.impersonation.stopImpersonation();
    // A full reload: nothing of the bestuur's session may stay in the store.
    window.location.reload();
  }
}
