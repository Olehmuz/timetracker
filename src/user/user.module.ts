import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService, UserRepository],
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	exports: [UserService],
})
export class UserModule {}
