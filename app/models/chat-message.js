import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class ChatMessage extends Model {
  @attr uri;
  @attr content;
  @attr('date') created;
  @attr maker;

  @belongsTo('chat-conversation', {
    async: false,
    inverse: 'messages',
    as: 'chat-message',
  })
  conversation;
  @hasMany('chat-document', { async: false, inverse: null }) attachments;
}
