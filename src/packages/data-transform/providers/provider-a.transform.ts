import { Injectable } from '@nestjs/common';
import { JobType } from '../types/job.type';

@Injectable()
export class ProviderATransform implements DataTransform {
	transform(data: any): JobType[] {
		return data.jobs.map((job: any) => {
			const salaryParts = job.details.salaryRange
				.match(/\d+/g)
				.map(Number);
			const minSalary = salaryParts ? salaryParts[0] * 1000 : null;
			const maxSalary = salaryParts ? salaryParts[1] * 1000 : null;

			const currencyParts = job.details.salaryRange.match(/[^\d\s]/);
			const currency = currencyParts ? currencyParts[0] : '';

			return {
				id: job.jobId,
				title: job.title,
				location: job.details.location,
				type: job.details.type,
				minSalary: minSalary,
				maxSalary: maxSalary,
				currency: currency,
				companyName: job.company.name,
				companyIndustry: job.company.industry,
				skills: job.skills,
				postedDate: job.postedDate,
			};
		});
	}
}
