import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { BlogModule } from './blog/blog.module'
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from './utils/middleware/logger.middleware'
import * as appConfig from './app.config.json'

@Module({
    imports: [BlogModule, UserModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (appConfig.logger) {
            consumer
                .apply(LoggerMiddleware)
                .forRoutes('*')
        }
    }
}
