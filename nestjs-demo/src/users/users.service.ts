import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

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
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.userRepository.find({ id });

    this.em.assign(user, updateUserDto as any);
    await this.em.flush();
  }

  async remove(id: number) {
    const user = await this.userRepository.getReference(id)
    await this.em.remove(user).flush()
  }
}
