import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  SALT_OR_ROUNDS = 10;
  JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 注册
   * @param signUpDto
   * @returns
   */
  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const { email, password } = signUpDto;
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new ConflictException('User with this email already exitss');
    }
    // Hash password
    const hash = await bcrypt.hash(password, this.SALT_OR_ROUNDS);

    // create User
    const createdUser = await this.usersService.create({
      email,
      password: hash,
    });

    return this.generateUserToken(createdUser);
  }

  /**
   * 登录
   * @param email
   * @param pass
   * @returns
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException();
    }

    // compare password
    const compareResult = await bcrypt.compare(pass, user.password);
    if (!compareResult) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateUserToken(user);
  }

  /**
   * 生成jwt
   * @param user
   * @returns
   */
  private async generateUserToken(user: UserEntity) {
    const payload = { sub: user.id, username: user.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
