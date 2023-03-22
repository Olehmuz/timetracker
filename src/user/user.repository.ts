import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ALREADY_EXISTS_GOOGLEID } from './dto/user.constants';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
	async create(dto: UserDTO): Promise<UserDocument> {
		const existingUser = await this.findOneByGoogleId(dto.googleId);
		if (existingUser) {
			throw new BadRequestException(ALREADY_EXISTS_GOOGLEID);
		}
		const newUser = new this.userModel({
			email: dto.email,
			googleId: dto.googleId,
		});
		return newUser.save();
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
