//* 1 adım

//? @nestjs/common paketinden Injectable import et bütün servisleri  içe aktarmak için

//* 2 adım

//? @Injectable fonksyonunu en üstte çağır ve AuthService classını yaz ve dışa aktar, class içinde yapılacak fonksyonlar mevcuttur örn: register, login vs

//* 3 adım

//? Dışa aktardıktan sonra bu classı auth.module.ts içinde import etmelisin veya global kullanmak istiyorsak app.module.ts içinde import edilmeli

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'prisma.service'
import { AuthDto } from './dto/auth.dto'

//! Önemli adımlar

//? 1.adım: JwtServisin çalışması için ilkönce AuthModule dosyasındaki imports içine JwtModule dahil edilmeli

//? 2.adım: imports içinde JwtServisin.registerAsync() fonksyonu oluştur

//? 3.adım: fonskyon içine de obje oluştur ve o obje içinde de imports dependecy array oluşturup onun içine ConfigModule, inject oluşturup içine ConfigService , useFactory oluşturup içine ise oluşturduğumuz getJwtConfig ekliyoruz
import { ConfigService } from '@nestjs/config'

//? 4.adım : jwtStrategy ekle

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private configService: ConfigService
	) {}

	//======================REGİSTER===================//
	async register(dto: AuthDto) {
		//* user olup olmadığını kontrol et

		const isHaveUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		//  eğer var ise hata fırlat

		if (isHaveUser) throw new BadRequestException('User Already Exist!')

		// eğer ıser yok ise oluştur

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.person.firstName(),

				//? parolayı hashlemeyi unutma asyn fonksyondur
				password: await hash(dto.password)
			}
		})

		// userı id'sine göre token alma

		const tokens = await this.issueTokens(user.id)

		// sonra userı ve tokenları döndürdüm
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	//!bunu yapmadan önce jwt configi oluşturmalısın
	// token alma fonksyonu

	private async issueTokens(userId: number) {
		const data = { id: userId }

		// acccessTokenı aldık ve geçerlilik süre verdik
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h',
			secret: this.configService.get('JWT_SECRET')
		})

		// refreshTokenı aldık ve geçerlilik süre verdik
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '1d',
			secret: this.configService.get('JWT_SECRET')
		})

		// iki tokenı döndürdük

		return {
			accessToken,
			refreshToken
		}
	}

	// userı login olursa register olursa bu şekilde döndürmek için yazılan fonksyon

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}

	//=========================LOGIN========================//
	async login() {}

	//======================GET NEW TOKEN===================//

	async getNewTokens() {}
}
