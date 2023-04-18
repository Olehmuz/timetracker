import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { ManagementRepository } from './management.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
	providers: [ManagementService, ManagementRepository],
	imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
	controllers: [ManagementController],
})
export class ManagementModule {}
