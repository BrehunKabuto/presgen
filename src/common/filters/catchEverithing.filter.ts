import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';



@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new  Logger(CatchEverythingFilter.name)

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
   
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest()
    const response = ctx.getResponse()
 
    let  httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    if(exception instanceof HttpException){

      httpStatus = exception.getStatus()  
      const res = exception.getResponse()
      message = 
        typeof res === 'string'
        ? res
        : (res as any ).message || message

    }

    this.logger.error(
          JSON.stringify({
            exception: (exception as any).stack || exception,
            path: request.url,
            method: request.method
          })
        )

        const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };

    httpAdapter.reply(response, responseBody, httpStatus);
    
    
  }
}
