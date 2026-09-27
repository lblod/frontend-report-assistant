import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ConversationsConversationRoute extends Route {
  @service store;

  async model({ id }) {
    const [conversation, agents] = await Promise.all([
      this.store.findRecord('chat-conversation', id, {
        include: 'messages.attachments',
        reload: true,
      }),
      this.store.query('chat-agent', { 'page[size]': 1 }),
    ]);
    return { conversation, assistant: agents[0] };
  }
}
