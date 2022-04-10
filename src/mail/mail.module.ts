import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports:[
    MailerModule.forRootAsync({
      useFactory:async (config:ConfigService)=>({
        transport:{
          host:'smtp.gmail.com',
          port:465,
          secure:true,
          auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD,
          },
        },
        defaults:{
          from:`"no reply"<${process.env.MAIL_USERNAME}>`,
        },
      }),
      inject:[ConfigService],
    })
  ],
  providers: [MailService],
  exports:[MailService],
})
export class MailModule {}
