import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const res = ctx.switchToHttp().getResponse();
  const req = ctx.switchToHttp().getRequest();
  // if route is protected, there is a user set in auth.middleware

  const token = req.headers.authorization
    ? (req.headers.authorization as string).split(' ')
    : null;

  if (data === 'token' && token) {
    return token[1];
  }

  if (!!res.locals.user) {
    return res.locals.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt

  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], SECRET);
    return !!data ? decoded[data] : decoded.user;
  }
});
