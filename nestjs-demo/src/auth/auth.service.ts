import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto.js';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity.js';
import { Loaded } from '@mikro-orm/core';

export interface TokenObject {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  SALT_ROUNDS = 10;

  ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
  REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
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
    // Email existed
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

    return this.issueToken(createdUser)
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

  private async refresh(refreshToken: string) {
    // vertify refresh token
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.REFRESH_SECRET
    })

    // query db
    const user  = await this.usersService.findOne(payload.id)

    // check user.refreshToken
    if (!user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials')
    }
    
    const result = await bcrypt.compare(user.refreshToken, refreshToken)
    if(!result)
    {
      throw new UnauthorizedException('Invalid credentials')
    }
    
    return this.issueToken(user)
  }

  // TODO: 修改为更简便的参数
  private async issueToken(user: User) {
    // Generate JWT token
    const tokenObj = await this.generateUserToken(user);
    // Update user's refreshToken
    const hashedRefereshToken = await bcrypt.hash(tokenObj.refresh_token, this.SALT_ROUNDS);
    this.usersService.update(user.id, { refreshToken: hashedRefereshToken });
    return tokenObj;
  }

  /**
   * 生成jwt
   * @param user
   * @returns
   */
  private async generateUserToken(user: User) {
    
    if(!this.ACCESS_SECRET || !this.REFRESH_SECRET)
    {
      throw new NotFoundException('Secret not found')
    }

    const payload = { sub: user.id, username: user.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.ACCESS_SECRET
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.REFRESH_SECRET
      }),
    };
  }
}
