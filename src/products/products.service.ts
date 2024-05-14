import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.save(createProductDto);

      if (!product) {
        throw new BadRequestException('Product could not be saved');
      }

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll({ limit = 2, page = 1 }: PaginationQueryDto) {
    const offset = (page - 1) * limit;
    try {
      return await this.productRepository.find({ skip: offset, take: limit });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    try {
      const productUpdated = await this.productRepository.update(
        id,
        updateProductDto,
      );

      if (productUpdated.affected === 0) {
        throw new BadRequestException('Failed to update product');
      }

      return productUpdated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.delete({ id });

      if (product.affected === 0) {
        throw new BadRequestException('Failed to delete product');
      }

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
