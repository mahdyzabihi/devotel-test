import { Injectable } from '@nestjs/common';
import { JobType } from '../types/job.type';

@Injectable()
export class ProviderBTransform implements DataTransform {
	transform(data: any): JobType[] {
		const jobsList = data.data.jobsList;
		return Object.entries(jobsList).map(([jobId, job]: [string, any]) => ({
			id: jobId,
			title: job.position,
			location: `${job.location.city}, ${job.location.state}`,
			type: job.location.remote ? 'Remote' : 'On-Site',
			minSalary: +job.compensation.min,
			maxSalary: +job.compensation.max,
			currency: job.compensation.currency,
			companyName: job.employer.companyName,
			companyWebsite: job.employer.website,
			experience: +job.requirements.experience,
			skills: job.requirements.technologies,
			postedDate: job.datePosted,
		}));
	}
}
