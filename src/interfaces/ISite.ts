import { Document } from 'mongoose';

export interface ISite extends Document {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
