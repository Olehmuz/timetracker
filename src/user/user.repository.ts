import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { BaseRepository } from './../common/baseRepository/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
		super(userModel);
	}

	async findOneByGoogleId(googleId: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ googleId }).exec();
	}
	async findOneByEmail(email: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ email }).exec();
	}
}
