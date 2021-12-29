import { model, Model, Schema } from 'mongoose';
import { ISite } from '../interfaces/ISite';

interface ISiteModel extends Model<ISite> {}

const siteSchema: Schema = new Schema<ISite>({
  name: {
    type: String,
    required: [true, 'Site name required']
  },

  description: {
    type: String,
    required: [true, 'Site description required']
  },

  latitude: {
    type: Number,
    required: [true, 'latitude required']
  },
  longitude: {
    type: Number,
    required: [true, 'longitude required']
  }
});

const Site = model<ISite, ISiteModel>('Site', siteSchema);

export default Site;
