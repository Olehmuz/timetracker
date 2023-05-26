import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserPositionDocument = HydratedDocument<UserPosition>;

@Schema()
export class UserPosition {
	@Prop({ unique: true, required: true })
	userId: string;

	@Prop({ required: true })
	positionId: string;
}

export const UserPositionSchema = SchemaFactory.createForClass(UserPosition);
