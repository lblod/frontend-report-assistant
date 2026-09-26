import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ConversationRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model({ id }) {
    const [conversation, agents, conversations] = await Promise.all([
      this.store.findRecord('chat-conversation', id, {
        include: 'messages.attachments',
        reload: true,
      }),
      this.store.query('chat-agent', { 'page[size]': 1 }),
      this.store.query('chat-conversation', {
        sort: '-last-activity',
        'page[size]': 50,
      }),
    ]);
    return { conversation, assistant: agents[0], conversations };
  }
}
