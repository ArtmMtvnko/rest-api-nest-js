import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { BlogModule } from './blog/blog.module'
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from './utils/middleware/logger.middleware'
import { configuration } from './config/app.config'
import { ConfigModule } from '@nestjs/config'
import { LoginModule } from './login/login.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            global: true,
            signOptions: { expiresIn: '24h' },
        }),
        BlogModule,
        UserModule,
        LoginModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (configuration.logger) {
            consumer.apply(LoggerMiddleware).forRoutes('*')
        }
    }
}
