import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { JobRepository } from './repositories/job.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([JobRepository])],
	providers: [DatabaseService, JobRepository],
	exports: [DatabaseService, JobRepository],
})
export class DatabaseModule {}
