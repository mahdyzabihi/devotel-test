import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { DataTransformModule } from '../data-transform/data-transform.module';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [HttpModule, DataTransformModule],
	providers: [ApiService, ConfigService],
	exports: [ApiService],
})
export class ApiModule {}
