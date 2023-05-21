import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { ManagementRepository } from './management.repository';
import { Project, ProjectSchema } from './schemas/project.schema';
import { UserProject, UserProjectSchema } from './schemas/user-project.schema';
import { UserProjectRepository } from './user-project.repository';

@Module({
	providers: [ManagementService, ManagementRepository, UserProjectRepository],
	imports: [
		MongooseModule.forFeature([
			{ name: Project.name, schema: ProjectSchema },
			{ name: UserProject.name, schema: UserProjectSchema },
		]),
	],
	exports: [ManagementService],
	controllers: [ManagementController],
})
export class ManagementModule {}
