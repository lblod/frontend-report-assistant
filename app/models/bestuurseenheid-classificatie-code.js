import Model, { attr } from '@warp-drive/legacy/model';

export default class BestuurseenheidClassificatieCode extends Model {
  @attr() label;
  @attr() scopeNote;
  @attr() uri;
}
