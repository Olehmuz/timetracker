import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Grades } from '../types/grades.type';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema()
export class UserProfile {
	@Prop({ unique: true, required: true })
	userId: string;

	@Prop({ default: process.env.DEFAULT_ACTIVE_PROJECT_ID })
	projectId: string;

	@Prop({ default: process.env.DEFAULT_ACTIVE_POSITION_ID })
	positionId: string;

	@Prop({ default: 'junior' })
	grade: Grades;
}

export const UserProjectSchema = SchemaFactory.createForClass(UserProfile);
