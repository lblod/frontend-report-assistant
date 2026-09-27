import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { renderMarkdown } from 'frontend-report-assistant/utils/markdown';

export default class AssistantMessage extends Component {
  @tracked showBijlagen = false;

  // The string is DOMPurify-sanitized in utils/markdown; htmlSafe only marks
  // it as rendered HTML.
  get html() {
    return htmlSafe(renderMarkdown(this.args.message.content));
  }

  get attachments() {
    return this.args.message.attachments || [];
  }

  @action
  openBijlagen(event) {
    event.preventDefault();
    this.showBijlagen = true;
  }

  @action
  showText() {
    this.showBijlagen = false;
  }
}
