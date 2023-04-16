import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TrackerDocument = HydratedDocument<Tracker>;

@Schema()
export class Tracker {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: '_id', required: true })
	userId: string;

	@Prop({ required: true })
	date: Date;

	@Prop({ required: true, max: 8 })
	trackedTime: number;
}

export const TrackerSchema = SchemaFactory.createForClass(Tracker);
