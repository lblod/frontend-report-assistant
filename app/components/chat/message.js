import Component from '@glimmer/component';
import { componentFor } from 'frontend-lblod-chat/utils/message-types';

export default class ChatMessage extends Component {
  get body() {
    return componentFor(
      this.args.message.constructor.modelName,
      this.args.isAssistant,
    );
  }
}