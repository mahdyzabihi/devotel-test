import { Module } from '@nestjs/common';
import { DataTransformService } from './data-transform.service';
import { ProviderATransform } from './providers/provider-a.transform';
import { ProviderBTransform } from './providers/provider-b.transform';

@Module({
	providers: [DataTransformService, ProviderATransform, ProviderBTransform],
	exports: [DataTransformService, ProviderATransform, ProviderBTransform],
})
export class DataTransformModule {}
