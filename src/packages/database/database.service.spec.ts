import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { JobRepository } from './repositories/job.repository';
import { JobType } from '../data-transform/types/job.type';
import { DataSource } from 'typeorm';

const mockJobRepository = {
	save: jest.fn().mockImplementation((jobs) => Promise.resolve(jobs)),
};
const mockDataSource = {};

describe('DatabaseService', () => {
	let service: DatabaseService;
	let jobRepository: JobRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DatabaseService,
				{
					provide: JobRepository,
					useValue: mockJobRepository,
				},
				{
					provide: DataSource,
					useValue: mockDataSource,
				},
			],
		}).compile();

		service = module.get<DatabaseService>(DatabaseService);
		jobRepository = module.get<JobRepository>(JobRepository);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(jobRepository).toBeDefined();
	});

	describe('bulkInsertAsync', () => {
		const sampleJobs: JobType[] = [
			{
				id: 'job-1',
				title: 'Senior Developer',
				location: 'New York, NY',
				type: 'Contract',
				minSalary: 60000,
				maxSalary: 98000,
				currency: 'USD',
				companyName: 'Tech Corp',
				companyIndustry: 'IT',
				skills: ['Node.js', 'TypeScript'],
				postedDate: '2025-01-01',
			},
		];

		it('should call job repository save with correct data', async () => {
			await service.bulkInsertAsync(sampleJobs);

			expect(jobRepository.save).toHaveBeenCalledWith(sampleJobs);
			expect(jobRepository.save).toHaveBeenCalledTimes(1);
		});
	});
});
