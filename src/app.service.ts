import { Injectable } from '@nestjs/common';
import { JobRepository } from './packages/database/repositories/job.repository';
import { JobOfferQuery } from './queries/job-offer.query';

@Injectable()
export class AppService {
	constructor(private readonly _jobRepository: JobRepository) {}

	async jobOffers(dto: JobOfferQuery) {
		const data = await this._jobRepository.listAsync(
			dto.title,
			dto.location,
			dto.minSalary,
			dto.maxSalary,
			dto.page,
			dto.limit,
		);
		return {
			data: data,
		};
	}
}
