import Component from '@glimmer/component';

// One row of the bijlagen overview: what it is, and where to get it.
export default class ChatAttachment extends Component {
  // The file service serves every bijlage at /files/<uuid>/download.
  get href() {
    return `/files/${this.uuid}/download`;
  }

  get uuid() {
    return String(this.args.document.uri || '').split('/').pop();
  }

  // What the document holds, in Dutch, so the overview explains itself.
  get what() {
    const format = this.args.document.format || '';
    if (format.includes('turtle')) return 'De specificatie van het rapport als Turtle-bestand';
    if (format.includes('csv')) return 'De resultaten van het rapport als CSV-bestand';
    return 'Bestand';
  }
}
