<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Nestjs nedir?

NestJS, server-side uygulamalarının geliştirilmesini kolaylaştırmak amacıyla geliştirilmiş bir framework’tür. NestJS, Express ve Node.js’i kendi içerisinde default olarak barındıran bir katman olarak tanımlanabilir. Framework, progressive JavaScript kullanmakta olup, Typescript’i desteklemekle birlikte üç önemli ilkeyi birleştirmektedir: 
 
 ```bash
  OOP - Nesne Yönelimli Programlama, 
  FP - Fonksiyonel Programlama, 
  FRP - Fonksiyonel reaktif programlama
```


## Proje oluşturmak için 

```bash 
$ npm i -g @nestjs/cli
$ nest new project-name
```

Bu adımlardan sonra proje ilk açıldığında karşınıza böyle bir görüntü çıkacaktır:
***
![first page](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/f774d0c5-def9-4818-af7f-4935b217f8f5)

***

- Burada en önemli dosya main dosyasıdır ve ondan sonra ise Module dosyasıdır

- **main.ts** dosyasında uygulamamızın hangi portta çalışacağını veya HTTP url yollunda ekler ekleneceğını, cors işlemlerini burada halledebiliriz

- **app.module.ts** dosyasında ise bütün oluşturduğumuz controllerları, servislerleri hepsini birleştiriyoruz



- Örnek
```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

- bu modül içerisinde AppController ve AppServisi dahil ettik, bu modulü başka yerde kullanmak istiyorsak **export** fonksyonunu kullanmamız gerekecek

- 1.Kural : Servisler **providers**  dependecy array içinde verilir
- 2.Kural : Controllerlar **controllers**  dependecy array içinde verilir

  

    
## Nestjs Kavramı Özellikleri

- **Controller nedir?**
- **Service nedir?**
- **Dto nedir?**

**Controller** - gelen veriyi alıp ona göre cevap vermektir 

- örneğin kullanıcı kayıt olmak istiyor ve bilgilerini girerek kayıt olma butonuna bastı o bilgileri http request ile bizim backende geldi, gelen verileri de Controller karşılayacaktır ve o veriyi servise gönderecektir, servis bu veriyi alır eğer kullanıcı var ise **Kullanıcı mevcut** cevabı döndürür, eğer yok ise yeni kullanıcı kayıt edecek ve kayıt edilen kullanıcıyı döndürcektir

**Servis** - controllerdan gelen verileri değerlendirmek için yazılır

- controllerdan gelen veriyi alıp inceleyecektir ona göre cevap döndürecektir bütün logic işlemler servisler içinde yapılmalıdır

- Herhangi bir servisin içinde yazılan metod başka bir controllerda kullanılabilir


**DTO - ( Data Transfer Object )** - verileri istediğimiz şekilde döndürmeye denir

  - DTO, veri transferi için kullanılan bir tasarım desenidir. DTO’lar, veritabanından gelen verileri, uygulama katmanları arasında transfer etmek için kullanılır. DTO’lar, verilerin taşınmasını kolaylaştırır ve verilerin sadece gerekli kısımlarını taşıyarak ağ trafiğini azaltır. DTO’lar, verilerin sunum katmanına gönderilmeden önce işlenmesine izin verir




## Projeye Başlama

- ilk önce veritabanını kurmamız lazım, veritabanı için **PostgreSQL ve Prisma** kullanacağım

#### Prisma kurulumu:


- 1.adım:  **npm install prisma --save-dev** veya **yarn add prisma --save-dev**
- 2.adım:  **npx prisma init** her zaman npx yazmak istemiyorsanız prismayı global olarak kurmalısınız sadece **prisma init** yazarak aynı işlemi yapabilirsiniz

bu komutları terminale yazdıktan sonra karşınıza şöyle bir görüntü çıkacaktır

***
![second step](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/0446bc7d-a0ca-4862-a9e7-adb12aeaeb1d)


***

prisma size adım adım yapmanız gereken şeyler söylüyor

- 1.adım: DATABASE_URL oluştur ve onu .env dosyası içine koy, **Not**: .env dosyası commit edilmeyecektir ve ayrıca .gitignore dosyasına da eklenecektir
- 2.adım: eğer db zaten var ise **prisma migrate** komutunu kullanmanız gerekecek eğer yok  ise 3.adıma geçebiliriz

- 3.adım: basitce user modelini yazalım ve onu **prisma db push** komutuyla veritabanına bir user tablosu ekleyelelim

#### User modeli 

**Note**: modelleri prisma schema içinde yazılmalıdır
***
![model](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/7f2a94d9-c391-487a-a1b4-ff42da4e5669)

***

#### Önemli: 
**Prismanın** tek eksiği şu ki bütün modelleri bir tane schema içinde yazılmasıdır, ayıramıyorsunuz yani

  


### Veritabanı Tablo Görüntüsü
***

![tabslo](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/aa1214c7-2260-4cc1-867a-9d09dccafc0b)


*** 
### Prisma servisi dahil etme

- Prisma servisi dahil etmemizin sebebi şu ki veritabanını ile doğrudan iletişim kurmaktır veya iletişimi kesmektir

- Bu işlemi yaptıkdan sonra **PrismaServisi**   AppModule dosyası içindeki provider içine dahil etmeliyiz


  
***

### Auth İşlemleri:  Module, Controller, Servis yazılmalı


- Auth Module içeriği
***

![MODULE](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/f5e3e0c6-8a8c-4506-8005-1c1baf64ca8b)


***
- Auth Controller içeriği
***
![contoller](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/43d34002-0175-4b49-bbe9-95f514e64a24)


***
***

### Auth İşlemleri: Auth Dto ve Refresh Token Dto yazılmalı

- Bunların yazılma sebebi şu ki datayı transfer ederken dtolar işimize yaracaktır ve ayrıca
  dto'lar içindeki değişkenlere **class-validator** kütüphanesini dahil ederek tip        verebiliriz ve **class-transformer** kütüphanesini eklemeyi de unutumayınız
***
  ![dto içeriği](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/a70ca420-8620-4a80-9044-462280888a57)

  ![dto içeriğ2i](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/bca9a2ae-9342-4403-9ed8-669dda04e03f)

***


### Jwt config yazma

 - jwt config yazmamızın sebebi şu ki her token ile istek atıldığında tokenın geçerli olup olmadığını kontrol etmek için **secret_key** anahtara ihtiyacımız var,  o anahtarı dinamik olarak alabilmek için de **configServis** yazılmalı


   - bu İşlemleri daha iyi anlayabilmek için:
    - @nestjs/jwt
    - @nestjs/passport
    - passport-jwt
    - passport
    - @nestjs/config

    kütüphanelerini inceleyebilirsiniz... 

  - jwt config
    ***

       ![JWT CONFİG](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/fc235d30-99eb-4a37-bc3a-bbb64bb131f2)

    
    ***

**ÖNEMLİ 2 KURAL**

- ConfigService her yerde çalışması için **app.module.ts** de **imports** içine bu şekilde **ConfigModule.forRoot()**  dahil edilmelidir

- JwtService her yerde çalışması için **app.module.ts** de **providers** içine eklenmelidir

- Aynı kural **PrismaService** için de geçerli

- Bu fonksyonlar nerede kullanılacak ise o modulde import edilmelidir


  
  ***


### Jwt Strategy yazma

 - Jwt Strategy yazmamızın sebebi şu ki token ile HTTP isteklerinde bulunurken bu userın tokenı geçerli olup olmadığını kontrol etmektir

   - jwt strategy
    ***
   
    ![JWT strag](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/00f9b2fe-2d96-4b95-9e7d-38bf4cc23445)

  
    ***

### Auth Register, Login ve RefreshToken Servisleri

-  Register Servisi Görüntüsü
   
   ![register](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/38e40838-9bec-4dc8-9d36-1ca8bdb3913a)


-  Login Servisi Görüntüsü
   
   ![login](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/9daedfcd-49f4-4208-90ab-be7907282dc2)


-  Refresh Token Servisi Görüntüsü
   
  
   ![refresh](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/b24aa83c-6d80-4b0f-87f5-4edb7c3bf16a)


-  Yardımcı Fonksyonlar Görüntüsü
   
  ![yardımcı](https://github.com/thekinv21/nestjs_authentication_be/assets/92122363/a06807e6-eee3-4353-b477-99412d0db234)

   
   

# production mode
$ yarn run start:prod
```
