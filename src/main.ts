import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './utils/filters/http-exception.filter'
import { configuration } from './config/app.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix(configuration.globalPrefix)

    if (configuration.validation) {
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true
            })
        )
    }

    if (configuration.exceptionFilter) {
        app.useGlobalFilters(new HttpExceptionFilter())
    }

    if (configuration.cors) {
        app.enableCors()
    }

    if (configuration.swagger) {
        const config = new DocumentBuilder()
            .setTitle('Blogs API')
            .setDescription('Documentation for Blogs application')
            .setVersion('1.0')
            .addTag('Blogs')
            .addTag('Users')
            .addTag('Login')
            .build()
    
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('api', app, document)
    }

    await app.listen(configuration.port)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
