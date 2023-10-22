//* 1.adım

//? @nestjs/common kütüphanesi içinden Controllerı import et ve  request için gereken http GET,PUT,POST,DELETE,PATCH import edebilirsin

//* 2.adım

//? Controller fonksyonunu en üstte çağır ve AuthController classı yaz onun içine de yapıcı yaz yani constructor

//* POST,PUT, PATCH işlemlerinde BODY göndermemiz gerekecek onu da DTO yazarak kolayca  halledebiliriz

//* Dtoyu kullanabilmek için UsePipes kullanmamız gerekecek

//* bunları yaparken : class-validator, class-transformer kütüphanlerini dahil etmeyi unutmayınız

//? class-validator - möderatör, yani değişkenlerin hangi tipte olacağını belirler

//? class-transformer - dto içindir

import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/* Register, Login , GetToken contollerları olacak */

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}
}
