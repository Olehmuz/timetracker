import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { ManagementRepository } from './management.repository';
import { Project, ProjectSchema } from './schemas/project.schema';
import { UserProfile, UserProjectSchema } from './schemas/userProfile.schema';
import { UserProfileRepository } from './userProfile.repository';
import { Position, PositionSchema } from './schemas/position.schema';
import { UserPosition, UserPositionSchema } from './schemas/user-position.schema';
import { PositionRepository } from './position.repository';

@Module({
	providers: [ManagementService, ManagementRepository, UserProfileRepository, PositionRepository],
	imports: [
		MongooseModule.forFeature([
			{ name: Project.name, schema: ProjectSchema },
			{ name: UserProfile.name, schema: UserProjectSchema },
			{ name: Position.name, schema: PositionSchema },
			{ name: UserPosition.name, schema: UserPositionSchema },
		]),
	],
	exports: [ManagementService],
	controllers: [ManagementController],
})
export class ManagementModule {}
