import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../common/baseRepository/base.repository';

import { UserProfile, UserProfileDocument } from './schemas/userProfile.schema';

@Injectable()
export class UserProfileRepository extends BaseRepository<UserProfileDocument> {
	constructor(
		@InjectModel(UserProfile.name) private readonly projectModel: Model<UserProfileDocument>,
	) {
		super(projectModel);
	}
}
