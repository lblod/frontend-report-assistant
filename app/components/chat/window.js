import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, restartableTask, timeout } from 'ember-concurrency';
import ENV from 'frontend-lblod-chat/config/environment';
import { setting } from 'frontend-lblod-chat/utils/setting';
import { ANSWER_CEILING_MS } from 'frontend-lblod-chat/utils/ceilings';

const POLL_MS = 3000;

export default class ChatWindow extends Component {
  @service store;

  @tracked now = Date.now();
  assistantPath = setting(ENV.assistantPath, '/assistant');

  constructor() {
    super(...arguments);
    this.poll.perform();
  }

  get conversation() {
    return this.args.conversation;
  }

  get messages() {
    return this.conversation.messages
      .slice()
      .sort((a, b) => a.created - b.created);
  }

  get last() {
    return this.messages.at(-1);
  }

  isAssistant = (message) => message.maker === this.args.assistant?.uri;

  age(date) {
    return this.now - date.getTime();
  }

  // Waiting for an answer: the newest message is the user's.
  get waitingForAnswer() {
    return (
      !!this.last &&
      !this.isAssistant(this.last) &&
      this.age(this.last.created) < ANSWER_CEILING_MS
    );
  }

  get answerTimedOut() {
    return (
      !!this.last &&
      !this.isAssistant(this.last) &&
      this.age(this.last.created) >= ANSWER_CEILING_MS
    );
  }

  get waiting() {
    return this.waitingForAnswer;
  }

  // One loop. Runs while there is something to wait for, and not otherwise.
  poll = restartableTask(async () => {
    while (this.waiting) {
      await timeout(POLL_MS);
      await this.reload();
    }
  });

  async reload() {
    await this.store.findRecord('chat-conversation', this.conversation.id, {
      reload: true,
      include: 'messages.attachments',
    });
    this.now = Date.now();
  }

  send = task(async (content) => {
    const res = await fetch(
      `${this.assistantPath}/conversations/${this.conversation.id}/turns`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );
    if (!res.ok)
      throw new Error(`De vraag kon niet verstuurd worden (${res.status}).`);
    // The 202 answers with the message id, but fetching that message alone
    // does not link it into the conversation: the resource sends relationships
    // as links, without data. Reload the conversation instead, so the question
    // shows now and `waiting` turns true for the poll loop.
    try {
      await this.reload();
    } catch {
      // the poll loop retries the reload
    }
    this.poll.perform();
  });

  @action
  async refresh() {
    await this.reload();
    this.poll.perform();
  }
}
