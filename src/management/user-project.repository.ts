import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../common/baseRepository/base.repository';
import { UserProject, UserProjectDocument } from './schemas/user-project.schema';

@Injectable()
export class UserProjectRepository extends BaseRepository<UserProjectDocument> {
	constructor(
		@InjectModel(UserProject.name) private readonly projectModel: Model<UserProjectDocument>,
	) {
		super(projectModel);
	}
}
