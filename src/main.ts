import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './utils/filters/http-exception.filter'
import * as appConfig from './app.config.json'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix(appConfig.globalPrefix ?? 'api')

    if (appConfig.validation) {
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true
            })
        )
    }

    if (appConfig.exceptionFilter) {
        app.useGlobalFilters(new HttpExceptionFilter())
    }

    if (appConfig.cors) {
        app.enableCors()
    }

    if (appConfig.swagger) {
        const config = new DocumentBuilder()
            .setTitle('Blogs API')
            .setDescription('Documentation for Blogs application')
            .setVersion('1.0')
            .addTag('Blogs')
            .addTag('Users')
            .build()
    
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('api', app, document)
    }

    await app.listen(appConfig.port ?? 3000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
