import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class ChatConversation extends Model {
  @attr uri;
  @attr title;
  @attr('date') created;
  @attr('date') lastActivity;

  @belongsTo('gebruiker', { async: true, inverse: null }) creator;
  @hasMany('chat-message', {
    async: false,
    inverse: 'conversation',
    polymorphic: true,
  })
  messages;
}
