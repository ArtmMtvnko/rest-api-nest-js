import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class HttpExceptionFilter implements ExceptionFilter<PrismaClientKnownRequestError> {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        const request = context.getRequest<Request>()

        response
            .status(500)
            .json({
                message: exception.message,
                path: request.url,
                meta: exception.meta,
                timestamp: new Date().toISOString(),
            })
    }
}
