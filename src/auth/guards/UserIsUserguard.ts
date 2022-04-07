/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
        Injectable,
        CanActivate,
        Inject,
        forwardRef,
        ExecutionContext,
      } from '@nestjs/common';
      import { Observable } from 'rxjs';
      import { map } from 'rxjs/operators';
import { UserI } from 'src/user/model/user.interface';
import { UserService } from 'src/user/service/user-service/user.service';
      
      @Injectable()
      export class UserIsUserGuard implements CanActivate {
        constructor(
          @Inject(forwardRef(() => UserService))
          private userService: UserService,
        ) {}
      
        async canActivate(
          context: ExecutionContext,
        ): Promise<boolean>{
          const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: UserI = request.user;

    const find = this.userService.findOne(user.email);
     if(find){
     let haspermission = false;
     if (user.email === String(params.email)) {
         haspermission = true;
        }else{
           haspermission = false
        }
        return user && haspermission;
        }
      }
    }
      