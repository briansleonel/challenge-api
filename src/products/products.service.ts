import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { IPageMetadata } from 'src/common/interfaces/page-meta.interface';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { ProductQueryDto } from './dto/query-products.dto';

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

  async findAll(
    productQuery: ProductQueryDto,
  ): Promise<IPagination<ProductEntity>> {
    try {
      const [products, count] = await this.filterProducts(productQuery);

      const pageMetadata = this.getPaginationMetadata(
        productQuery.page,
        productQuery.limit,
        count,
      );

      return { data: products, pagination: pageMetadata };
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

  async filterProducts({ limit, order, page, text }: ProductQueryDto) {
    const offset = (page - 1) * limit;

    try {
      return await this.productRepository.findAndCount({
        skip: offset,
        take: limit,
        order: { updatedAt: order },
        where: [
          { name: Like(`%${text}%`) },
          { description: Like(`%${text}%`) },
        ],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getPaginationMetadata(
    page: number,
    limit: number,
    count: number,
  ): IPageMetadata {
    const totalPages = Math.ceil(count / limit);

    return {
      page,
      limit,
      totalItems: count,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: totalPages > page,
    };
  }
}
