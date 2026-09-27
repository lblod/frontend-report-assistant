import Component from '@glimmer/component';

export default class ChatAttachment extends Component {
  // The file service names the download after the physical file
  // (<uuid>.csv) unless ?name= says otherwise.
  get href() {
    const name = encodeURIComponent(this.args.document.filename || '');
    return `/files/${this.args.document.id}/download?name=${name}`;
  }

  get what() {
    const format = this.args.document.format || '';
    if (format.includes('turtle'))
      return 'De specificatie van het rapport als Turtle-bestand';
    if (format.includes('csv'))
      return 'De resultaten van het rapport als CSV-bestand';
    return 'Bestand';
  }
}
