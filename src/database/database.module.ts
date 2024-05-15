import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: function (dbConfig: ConfigType<typeof databaseConfig>) {
        const { database, host, password, port, username, ssl } = dbConfig;
        return {
          type: 'postgres',
          host,
          port,
          database,
          username,
          password,
          synchronize: true,
          autoLoadEntities: true,
          ssl,
          extra: { ssl: ssl ? { rejectUnauthorized: false } : null },
        };
      },
    }),
  ],
  //exports: [TypeOrmModule],
})
export class DatabaseModule {}
