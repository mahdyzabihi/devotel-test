import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'jobs', engine: 'InnoDB' })
export class JobEntity extends BaseEntity {
	@PrimaryColumn({ type: 'nvarchar', length: 50, nullable: false })
	id: string;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	title: string;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	location: string;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	type: string;

	@Column({ type: 'integer', nullable: false, default: 0 })
	minSalary: number;

	@Column({ type: 'integer', nullable: false, default: 0 })
	maxSalary: number;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	currency: string;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	companyName: string;

	@Column({ type: 'nvarchar', length: 50, nullable: true })
	companyIndustry: string;

	@Column({ type: 'nvarchar', length: 50, nullable: true })
	companyWebsite: string;

	@Column({ type: 'integer', nullable: true })
	experience: number;

	@Column({ type: 'simple-array', nullable: false, default: '' })
	skills: Array<string>;

	@Column({ type: 'nvarchar', length: 50, nullable: false, default: '' })
	postedDate: string;
}
