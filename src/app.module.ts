import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'prisma.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'

@Module({
	imports: [AuthModule, ConfigModule.forRoot()],
	controllers: [AppController, AuthController],
	providers: [AppService, AuthService, PrismaService, JwtService]
})
export class AppModule {}
