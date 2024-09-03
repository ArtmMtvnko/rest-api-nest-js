import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { BlogModule } from './blog/blog.module'
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from './utils/middleware/logger.middleware'

@Module({
    imports: [BlogModule, UserModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')
    }
}
