import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    // app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('Blogs API')
        .setDescription('Documentation for Blogs application')
        .setVersion('1.0')
        .addTag('Blogs')
        .addTag('Users')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
