import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
	@Prop({ unique: true, required: true })
	projectName: string;

	@Prop()
	projectDescription: string;

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

export const ProjectSchema = SchemaFactory.createForClass(Project);
