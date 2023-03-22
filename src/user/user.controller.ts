import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async createUser(@Body() dto: UserDTO): Promise<UserDocument> {
		return await this.userService.createUser(dto);
	}

	@Get(':googleId')
	async getUserByGoogleId(@Param('googleId') googleId: string): Promise<UserDocument> {
		return await this.userService.findUserByGoogleId(googleId);
	}
}
