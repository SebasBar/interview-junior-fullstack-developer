import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop()
  cityName: string;

  @Prop()
  uuid: string;

  @Prop()
  count: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
