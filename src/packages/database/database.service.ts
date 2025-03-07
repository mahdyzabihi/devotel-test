import { Injectable } from '@nestjs/common';
import { JobRepository } from './repositories/job.repository';
import { JobType } from '../data-transform/types/job.type';

@Injectable()
export class DatabaseService {
	constructor(private readonly _jobRepository: JobRepository) {}

	async bulkInsertAsync(jobs: JobType[]) {
		await this._jobRepository.save(jobs);
	}
}
