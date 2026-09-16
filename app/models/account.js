import Model, { attr, belongsTo } from '@warp-drive/legacy/model';

export default class Account extends Model {
  @attr() voId;
  @attr() provider;

  @belongsTo('gebruiker', {
    async: true,
    inverse: null,
  })
  gebruiker;
}
