import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_NOT_FOUND } from './dto/user.constants';
import { UserDTO } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(dto: UserDTO): Promise<UserDocument> {
		return await this.userRepository.create(dto);
	}

	async findUserByGoogleId(googleId: string): Promise<UserDocument> {
		const user = await this.userRepository.findOneByGoogleId(googleId);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}
		return user;
	}
}
