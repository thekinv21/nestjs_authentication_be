import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	// @IsOptional() yani zorunlu olmayan alan  anlamına geliyor
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters'
	})
	@IsString()
	password: string
}
