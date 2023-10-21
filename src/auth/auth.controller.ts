//* 1.adım

//? @nestjs/common kütüphanesi içinden Controllerı import et ve  request için gereken http GET,PUT,POST,DELETE,PATCH import edebilirsin

//* 2.adım

//? Controller fonksyonunu en üstte çağır ve AuthController classı yaz onun içine de yapıcı yaz yani constructor

import { Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('auth/register')
	async register() {
		return this.authService.register()
	}
}
