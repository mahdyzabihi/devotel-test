import { Injectable } from '@nestjs/common';

@Injectable()
export class DataTransformService {
	private dataTransform: DataTransform;

	setTransform(dataTransform: DataTransform) {
		this.dataTransform = dataTransform;
	}

	transform(data: any): any[] {
		if (!this.dataTransform) {
			throw new Error('Transform not set');
		}
		return this.dataTransform.transform(data);
	}
}
