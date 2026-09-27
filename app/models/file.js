import Model, { attr } from '@warp-drive/legacy/model';

// A bijlage: the logical file, so the file service serves it at
// /files/<id>/download.
export default class File extends Model {
  @attr uri;
  @attr filename;
  @attr format;
  @attr size;
  @attr('date') created;
}
