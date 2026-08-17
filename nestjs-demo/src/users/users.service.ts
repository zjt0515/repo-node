import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const user = this.userRepository.create(createUserDto);
    await this.em.flush();
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    if (!users) {
      throw new NotFoundException('Users not found')
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.findOne(id)

    this.em.assign(user, updateUserDto);
    await this.em.flush();

    return user
  }

  async remove(id: number) {
    const user = await this.userRepository.getReference(id)
    await this.em.remove(user).flush()
  }
}
