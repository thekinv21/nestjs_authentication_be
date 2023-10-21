import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// burada  http://localhost::4200/api olmasını sağladık
	await app.setGlobalPrefix('api')

	// hangi portta çalışmasını ve o portu dinlemesini söyledik
	await app.listen(4200)

	// cors işlemleri için
	app.enableCors()
}
bootstrap()
