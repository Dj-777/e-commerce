import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
} from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

import { UserService } from '../../user/user.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: CreateUserDto = request.user;

    const find = User.findOne(user.email);
    if (find) {
      let haspermission = false;
      if (user.email === String(params.email)) {
        haspermission = true;
      } else {
        haspermission = false;
      }
      return user && haspermission;
    }
  }
}
