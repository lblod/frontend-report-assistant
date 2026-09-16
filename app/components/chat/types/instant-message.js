import Component from '@glimmer/component';
import { FILE_CEILING_MS } from 'frontend-lblod-chat/utils/ceilings';

export default class InstantMessage extends Component {
  get late() {
    return (
      this.args.now - this.args.message.created.getTime() >= FILE_CEILING_MS
    );
  }
}
