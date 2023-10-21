//* 1 adım

//? @nestjs/common paketinden Injectable import et bütün servisleri  içe aktarmak için

//* 2 adım

//? @Injectable fonksyonunu en üstte çağır ve AuthService classını yaz ve dışa aktar, class içinde yapılacak fonksyonlar mevcuttur örn: register, login vs

//* 3 adım

//? Dışa aktardıktan sonra bu classı auth.module.ts içinde import etmelisin veya global kullanmak istiyorsak app.module.ts içinde import edilmeli

import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	async register() {
		return {
			name: 'Vadim',
			age: '23'
		}
	}
}
