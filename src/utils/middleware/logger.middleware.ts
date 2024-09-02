import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {        
        console.log(`
            \n============================
            \nMethod: ${req.method}
            \nPath: ${req.baseUrl}${req.path}
            \nParams: ${JSON.stringify(req.params, null, 2)}
            \nQuery: ${JSON.stringify(req.query, null, 2)}
            \nBody: ${JSON.stringify(req.body, null, 2)}
            \nHeaders: ${JSON.stringify(req.headers, null, 2)}
            \nTimestamp: ${new Date().toISOString()}
            \n============================
        `)
        next()
    }
}
