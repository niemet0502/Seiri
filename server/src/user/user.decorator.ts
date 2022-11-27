import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const res = ctx.switchToHttp().getResponse();
  // if route is protected, there is a user set in auth.middleware
  if (!!res.locals.user) {
    return res.locals.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = res.headers.authorization
    ? (res.headers.authorization as string).split(' ')
    : null;
  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], SECRET);
    return !!data ? decoded[data] : decoded.user;
  }
});
