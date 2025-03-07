import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class BasePaginationQuery {
	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) => (value === undefined ? 1 : Number(value)))
	@IsNumber()
	page: number = 1;

	@ApiPropertyOptional()
	@IsOptional()
	@Transform(({ value }) => (value === undefined ? 20 : Number(value)))
	@IsNumber()
	limit: number = 20;
}
