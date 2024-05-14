import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { RegisterDto } from 'src/common/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(registerDto: RegisterDto) {
    try {
      const passwordHashed = await bcrypt.hash(registerDto.password, 10);

      const user = await this.userRepository.save({
        ...registerDto,
        password: passwordHashed,
      });

      if (!user) {
        throw new BadRequestException('User could not be registered');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
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
    await this.findOne(id);

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
