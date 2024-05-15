import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { LangchainModule } from './langchain/langchain.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig],
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProductsModule,
    LangchainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
