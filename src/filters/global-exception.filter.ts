import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message: string | object = 'Internal server error';

		this.logger.error(`${request.method} ${request.url}`, exception.stack);

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse = exception.getResponse();

			if (typeof exceptionResponse === 'string') {
				message = exceptionResponse;
			} else if (
				typeof exceptionResponse === 'object' &&
				exceptionResponse !== null
			) {
				message = (exceptionResponse as any).message || message;

				if (status === HttpStatus.NOT_FOUND) {
					message = 'Resource not found';
				} else if (status === HttpStatus.UNAUTHORIZED) {
					message = 'Unauthorized access';
				} else if (status === HttpStatus.FORBIDDEN) {
					message = 'Access forbidden';
				} else if (status === HttpStatus.BAD_REQUEST) {
					message =
						(exceptionResponse as any).message || 'Bad request';
				} else if (status === HttpStatus.CONFLICT) {
					message = 'Conflict detected';
				} else if (status === HttpStatus.PAYLOAD_TOO_LARGE) {
					message = 'Payload too large';
				}
			}
		}

		if (exception instanceof QueryFailedError) {
			status = HttpStatus.BAD_REQUEST;
			if (exception.message.includes('duplicate')) {
				message = 'Duplicate entry error';
			} else if (exception.message.includes('foreign key')) {
				message = 'Foreign key constraint violation';
			} else if (exception.message.includes('null value')) {
				message = 'Null value constraint violation';
			} else if (
				exception.message.includes('violates unique constraint')
			) {
				message = 'Unique constraint violation';
			} else if (exception.message.includes('not-null constraint')) {
				message = 'Not-null constraint violation';
			} else if (exception.message.includes('value too long')) {
				message = 'Value too long for column';
			} else if (exception.message.includes('check constraint')) {
				message = 'Check constraint violation';
			} else {
				message = 'Database query failed';
			}
		}

		response.status(status).json({
			statusCode: status,
			message,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
