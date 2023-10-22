//* 1.adım: @nestjs/config  ve @nestjs/jwt kütühanalerini dahil etmelisin

//* 2.adım ConfigServisi @nestjs/config ve JwtModuleOptions'ı @nestjs/jwt den import e

//* 3.adım getJwt Config yaz asenkron fonksyon olsun parametre  olarak da configServisi ConfigService tipinde olsun döndüreceğı degeri de Promise olsun ve ayrıca generic olarrak JwtModuleOptions'ı alsın

//* 4.adım @nestjs/passport passport ve passport-jwt kütüphanelerini dahil et

//*  5.adım ConfigModule.forRoot() fonksyonunu appModule içindeki import içine koymalısn yoksa  configService vs çalışmaz

import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	// bizim env dosyadakı anahtar
	secret: configService.get('JWT_SECRET')
})
