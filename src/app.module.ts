import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrmConfig } from '../config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './app.entity';
import { config } from '../config/env';
import { WorkerModule } from './packages/worker/worker.module';
import { ApiModule } from './packages/api/api.module';
import { DatabaseModule } from './packages/database/database.module';
import { DataTransformModule } from './packages/data-transform/data-transform.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/.env`,
			load: [config],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: OrmConfig,
			inject: [ConfigModule],
		}),
		TypeOrmModule.forFeature(Entities),
		// Workers
		WorkerModule,
		// Modules
		ApiModule,
		DatabaseModule,
		DataTransformModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
