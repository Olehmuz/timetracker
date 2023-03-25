import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from './../common/decorators/public.decorator';
import { UserDTO } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: UserDTO): Promise<UserDocument> {
		return await this.userService.createUser(dto);
	}

	@Public()
	@Get('all')
	async getAllUsers(): Promise<UserDocument[]> {
		return await this.userService.findAllUsers();
	}

	@Get(':googleId')
	async getUserByGoogleId(@Param('googleId') googleId: string): Promise<UserDocument> {
		return await this.userService.findUserByGoogleId(googleId);
	}
}
