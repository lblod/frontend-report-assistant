import Model, { attr } from '@warp-drive/legacy/model';

// A bijlage of the report assistant: a real file in the semantic.works
// file data object model (logical nfo:FileDataObject over a physical
// share:// part), served by the file service at /files/<uuid>/download.
// dct:type marks what it holds.
export default class File extends Model {
  @attr uri;
  @attr filename;
  @attr format;
  @attr size;
  @attr('date') created;
}
