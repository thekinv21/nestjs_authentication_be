//* 1.adım:

//? Module import et @nestjs/common paketinden

//* 2.adım

//? @Module dekoratorü oluştur ve içine de obje oluştur, obje içinde de imports, providers, controllerları yerleştir daha sonra classı export et

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PrismaService } from 'prisma.service'
import { getJwtConfig } from 'src/config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy, JwtService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
