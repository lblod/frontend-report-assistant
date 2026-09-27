import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'frontend-report-assistant/config/environment';

// The admin role (EMBER_ADMIN_ROLE). Left unset, nobody is admin and the app
// does not look for an impersonation.
const ADMIN_ROLE = ENV.adminRole.startsWith('{{') ? null : ENV.adminRole;

export default class CurrentSessionService extends Service {
  @service session;
  @service store;
  @service impersonation;

  @tracked account;
  @tracked roles = [];

  get user() {
    return this.account?.belongsTo('gebruiker').value();
  }

  // An admin who acts as a bestuur keeps the admin menu: check the roles from
  // before the impersonation.
  get isAdmin() {
    const roles = this.impersonation.isImpersonating
      ? this.impersonation.originalRoles || []
      : this.roles;
    return Boolean(ADMIN_ROLE) && roles.includes(ADMIN_ROLE);
  }

  async load() {
    if (this.session.isAuthenticated) {
      if (ADMIN_ROLE) await this.impersonation.load();
      const accountId =
        this.session.data.authenticated.relationships.account.data.id;
      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker,gebruiker.bestuurseenheden',
      });
      // Not every login service sends roles.
      this.roles =
        this.session.data.authenticated.data?.attributes?.roles || [];
    }
  }
}
