import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ unique: true, required: true })
	googleId: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	surname: string;

	@Prop({ required: true })
	picture: string;

	@Prop()
	hashedRT: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
