export type JobType = {
	id: string;
	title: string;

	location: string;
	type: string;

	minSalary: number | null;
	maxSalary: number | null;
	currency: string;

	companyName: string;
	companyIndustry?: string;
	companyWebsite?: string;

	experience?: number;
	skills: Array<string>;

	postedDate: string;
};
