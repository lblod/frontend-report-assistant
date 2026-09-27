import Route from '@ember/routing/route';
import { service } from '@ember/service';

// The agent that signs the answers: CHAT_ASSISTANT_URI in the service, seeded
// by the portal's chat-assistant migration. The public graph holds other
// prov:SoftwareAgents, so pick it by uri.
const ASSISTANT_URI = 'http://data.lblod.info/id/chat-agents/rapportassistent';

export default class ConversationsConversationRoute extends Route {
  @service store;

  async model({ id }) {
    const [conversation, agents] = await Promise.all([
      this.store.findRecord('chat-conversation', id, {
        include: 'messages.attachments',
        reload: true,
      }),
      this.store.query('chat-agent', { filter: { ':uri:': ASSISTANT_URI } }),
    ]);
    return { conversation, assistant: agents[0] };
  }
}
