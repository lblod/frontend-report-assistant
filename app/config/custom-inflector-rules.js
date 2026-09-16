import { irregular } from '@warp-drive/utilities/string';

irregular('bestuurseenheid', 'bestuurseenheden');
irregular('bestuursorgaan', 'bestuursorganen');
irregular('werkingsgebied', 'werkingsgebieden');
irregular('form-data', 'form-data');

// TODO: find out why we do it like this instead of renaming the model?
irregular('address', 'adressen');
irregular('site', 'vestigingen');
