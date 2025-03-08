import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JobEntity } from '../entities/job.entity';

@Injectable()
export class JobRepository extends Repository<JobEntity> {
	constructor(private _dataSource: DataSource) {
		super(JobEntity, _dataSource.createEntityManager());
	}

	async listAsync(
		title: string | null,
		location: string | null,
		minSalary: number | null,
		maxSalary: number | null,
		page: number,
		limit: number,
	) {
		const query = this.createQueryBuilder('job');

		if (title)
			query.where('job.title LIKE :title', {
				title: `%${title}%`,
			});

		if (location)
			query.andWhere('job.location LIKE :location', {
				location: `%${location}%`,
			});

		if (minSalary)
			query.andWhere('job.minSalary >= :minSalary', {
				minSalary: minSalary,
			});

		if (maxSalary)
			query.andWhere('job.maxSalary <= :maxSalary', {
				maxSalary: maxSalary,
			});

		console.log(query.getQueryAndParameters());
		const [list, total] = await query
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount();

		return {
			list: list,
			total: total,
			page: page,
			limit: limit,
		};
	}
}
