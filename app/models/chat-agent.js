import Model, { attr } from '@warp-drive/legacy/model';

export default class ChatAgent extends Model {
  @attr uri;
  @attr name;
  @attr description;
}
