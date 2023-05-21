import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProjectDocument = HydratedDocument<UserProject>;

@Schema()
export class UserProject {
	@Prop({ unique: true, required: true })
	userId: string;

	@Prop({ required: true })
	projectId: string;
}

export const UserProjectSchema = SchemaFactory.createForClass(UserProject);
