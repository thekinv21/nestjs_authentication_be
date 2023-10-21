//* 1.adım:

//? Module import et @nestjs/common paketinden

//* 2.adım

//? @Module dekoratorü oluştur ve içine de obje oluştur, obje içinde de imports, providers, controllerları yerleştir daha sonra classı export et

import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

@Module({
	imports: [],
	controllers: [],
	providers: [AuthService]
})
export class AuthModule {}
