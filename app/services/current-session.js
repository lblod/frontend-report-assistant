import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;

  get user() {
    return this.account?.belongsTo('gebruiker').value();
  }

  async load() {
    if (this.session.isAuthenticated) {
      const accountId =
        this.session.data.authenticated.relationships.account.data.id;
      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker,gebruiker.bestuurseenheden',
      });
    }
  }
}
