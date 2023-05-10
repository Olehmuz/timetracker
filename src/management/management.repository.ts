import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/common/baseRepository/base.repository';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ManagementRepository extends BaseRepository<ProjectDocument> {
	constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {
		super(projectModel);
	}
}
