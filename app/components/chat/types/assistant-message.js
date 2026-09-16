import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { renderMarkdown } from 'frontend-lblod-chat/utils/markdown';

export default class AssistantMessage extends Component {
  // The string is DOMPurify-sanitized in utils/markdown; htmlSafe only marks
  // it as rendered HTML.
  get html() {
    return htmlSafe(renderMarkdown(this.args.message.content));
  }
}