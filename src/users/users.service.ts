import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);

      if (!user) {
        throw new BadRequestException('User could not be registered');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneByEmailWithPassword(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'firstName', 'lastName', 'password', 'role'],
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // verifico si el usuario existe

    try {
      const userUpdated = await this.userRepository.update(id, {
        ...updateUserDto,
      });

      if (userUpdated.affected === 0) {
        throw new BadRequestException('Failed to update user');
      }

      return userUpdated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.delete({ id });

      if (user.affected === 0) {
        throw new BadRequestException('Failed to delete user');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
