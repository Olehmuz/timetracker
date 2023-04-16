import { Module } from '@nestjs/common';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracker, TrackerSchema } from './schemas/tracker.schema';
import { TrackerRepository } from './tracker.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: Tracker.name, schema: TrackerSchema }])],
	controllers: [TrackerController],
	providers: [TrackerService, TrackerRepository],
})
export class TrackerModule {}
