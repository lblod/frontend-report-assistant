import Model, { attr } from '@warp-drive/legacy/model';

export default class ChatDocument extends Model {
  @attr uri;
  @attr name;
  @attr mediaType;
  @attr url;
}
