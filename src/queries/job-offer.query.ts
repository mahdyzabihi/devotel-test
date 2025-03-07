import { BasePaginationQuery } from './base-pagination.query';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class JobOfferQuery extends BasePaginationQuery {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	location?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) =>
		value !== null && value !== undefined ? parseInt(value) : null,
	)
	@IsNumber()
	minSalary?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) =>
		value !== null && value !== undefined ? parseInt(value) : null,
	)
	@IsNumber()
	maxSalary?: number;
}