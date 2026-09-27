import Model, { attr, belongsTo } from '@warp-drive/legacy/model';

export default class Bestuurseenheid extends Model {
  @attr() naam;

  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
}
