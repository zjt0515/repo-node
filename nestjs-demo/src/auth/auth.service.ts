import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, randomUUID } from 'crypto';
import { Request } from 'express';
import request from 'supertest';

import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';

export interface TokenObject {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  SALT_ROUNDS = 10;

  ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 注册
   * @param signUpDto
   * @returns
   */
  async signUp(email: string, password: string): Promise<TokenObject> {
    const user = await this.usersService.findOneByEmail(email);
    // Check email
    if (user) {
      throw new ConflictException('User with this email already exitss');
    }
    // Hash password
    const hash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const createdUser = await this.usersService.create({
      email,
      password: hash,
    });

    return this.issueToken(createdUser);
  }

  /**
   * 登录
   * @param email
   * @param pass
   * @returns
   */
  async signIn(email: string, pass: string): Promise<TokenObject> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User nod found');
    }

    // Compare password
    const compareResult = await bcrypt.compare(pass, user.password);
    if (!compareResult) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.issueToken(user);
  }

  async refresh(request: Request) {
    const refreshToken = this.extractTokenFromHeader(request);
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // vertify refresh token
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.REFRESH_SECRET,
    });

    // query db
    const user = await this.usersService.findOne(payload.id);

    // check user.refreshToken
    if (!user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const result = await bcrypt.compare(user.refreshToken, refreshToken)
    const result = user.refreshToken === this.hashRefereshToken(refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.issueToken(user);
  }

  async signOut(payload: any) {
    // 已通过guard校验了token
    // // Get authorization
    // const accessToken = this.extractTokenFromHeader(req)
    // if(!accessToken)
    // {
    //   throw new UnauthorizedException('Invalid credentials')
    // }

    // // Vertify accessToken
    // const payload = await this.jwtService.verifyAsync(accessToken, {
    //   secret: this.ACCESS_SECRET
    // })

    // // query db
    // const user  = await this.usersService.findOne(payload.id)

    // // check user.refreshToken
    // if (!user.refreshToken) {
    //   throw new UnauthorizedException('Invalid credentials')
    // }

    // Update refreshToken -> null
    return await this.usersService.update(payload.id, { refreshToken: null });
  }

  // TODO: 修改为更简便的参数
  private async issueToken(user: User) {
    // Generate JWT token
    const tokenObj = await this.generateUserToken(user);

    // hash refreshToken
    const hashedRefereshToken = this.hashRefereshToken(tokenObj.refresh_token);

    // Update user's refreshToken
    await this.usersService.update(user.id, {
      refreshToken: hashedRefereshToken,
    });
    return tokenObj;
  }

  private hashRefereshToken(refreshToken: string) {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  // 从请求头获取accessToken
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * 生成jwt
   * @param user
   * @returns
   */
  private async generateUserToken(user: User) {
    if (!this.ACCESS_SECRET || !this.REFRESH_SECRET) {
      throw new NotFoundException('JwtSecret not found');
    }

    const payload = { sub: user.id, username: user.email, jti: randomUUID(), roles: user.roles };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.ACCESS_SECRET,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.REFRESH_SECRET,
      }),
    };
  }
}
