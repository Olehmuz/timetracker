import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ unique: true, required: true })
	googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);