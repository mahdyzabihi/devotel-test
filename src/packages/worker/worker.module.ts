import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiModule } from '../api/api.module';
import { DatabaseModule } from '../database/database.module';
import { DataTransformModule } from '../data-transform/data-transform.module';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ApiModule,
		DatabaseModule,
		DataTransformModule,
	],
	providers: [WorkerService],
})
export class WorkerModule {}
