import {
  CheckConstraintViolationException,
  DriverException,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// key: 异常类型, value: 响应体
const DB_HTTP_MAP: Record<string, { status: number; message: string }> = {
  UniqueConstraintViolationException: {
    message: 'Resouce already exists',
    status: HttpStatus.CONFLICT,
  },
  CheckConstraintViolationException: {
    message: 'Check Error',
    status: HttpStatus.BAD_REQUEST,
  },
};
// 不指定范围，该过滤器就会捕获其他异常
@Catch(UniqueConstraintViolationException, CheckConstraintViolationException)
// @Catch()
export class DbExceptionFilter<T> implements ExceptionFilter {
  catch(exception: DriverException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionName = exception.name;
    const { status } = DB_HTTP_MAP[exceptionName];

    response.status(status).json(DB_HTTP_MAP[exceptionName]);
    // UniqueConstraint
    // if (exception instanceof UniqueConstraintViolationException) {
    //   response.status(HttpStatus.CONFLICT).json({
    //     message: 'Resouce already exists',
    //     status: HttpStatus.CONFLICT,
    //   });
    // }
  }
}
