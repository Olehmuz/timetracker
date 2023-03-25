import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_NOT_FOUND } from './user.constants';
import { UserDTO } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(dto: UserDTO): Promise<UserDocument> {
		return await this.userRepository.create(dto);
	}
	async findOneAndUpdateHash(id: string, hashRT: string): Promise<UserDocument> {
		const updatedUser = await this.userRepository.findOneAndUpdate(
			{ _id: id },
			{ hashedRT: hashRT },
		);
		if (!updatedUser) {
			throw new NotFoundException(USER_NOT_FOUND);
		}
		return updatedUser;
	}
	async findOneByAndUpdate(filter: Object, data: Object): Promise<void> {
		this.userRepository.findOneAndUpdate(filter, data);
	}
	async findOne(filter: Object): Promise<UserDocument> {
		const user = await this.userRepository.findOneByFilter(filter);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}
		return user;
	}
	async findAllUsers(): Promise<UserDocument[]> {
		return await this.userRepository.findAll();
	}
	async findUserByGoogleId(googleId: string): Promise<UserDocument> {
		const user = await this.userRepository.findOneByGoogleId(googleId);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}
		return user;
	}
}
