import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position {
	@Prop({ unique: true, required: true })
	positionName: string;

	@Prop({
		type: {
			junior: { type: Number, required: true },
			middle: { type: Number, required: true },
			senior: { type: Number, required: true },
		},
		_id: false,
		required: true,
	})
	salary: {
		junior: number;
		middle: number;
		senior: number;
	};
}

export const PositionSchema = SchemaFactory.createForClass(Position);
