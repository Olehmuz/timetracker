import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ALREADY_EXISTS_EMAIL, ALREADY_EXISTS_GOOGLEID } from './user.constants';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
	async create(dto: UserDTO): Promise<UserDocument> {
		const existingUserByGoogleId = await this.findOneByGoogleId(dto.googleId);
		if (existingUserByGoogleId) {
			throw new BadRequestException(ALREADY_EXISTS_GOOGLEID);
		}
		const existingUserByEmail = await this.findOneByEmail(dto.email);
		if (existingUserByEmail) {
			throw new BadRequestException(ALREADY_EXISTS_EMAIL);
		}

		const newUser = new this.userModel({
			email: dto.email,
			googleId: dto.googleId,
			name: dto.name,
			surname: dto.surname,
			picture: dto.picture,
		});
		return newUser.save();
	}

	async findOneAndUpdate(
		filter: Object,
		data: Object,
		options?: Object,
	): Promise<UserDocument | null> {
		return await this.userModel.findOneAndUpdate(filter, data).exec();
	}

	async findOneByFilter(filter: Object): Promise<UserDocument | null> {
		return await this.userModel.findOne(filter).exec();
	}

	async findOneByGoogleId(googleId: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ googleId }).exec();
	}
	async findOneByEmail(email: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ email }).exec();
	}
	async findAll(): Promise<UserDocument[]> {
		return await this.userModel.find({}).exec();
	}
}
