import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { GcpModule } from './gcp/gcp.module';
import { FolderModule } from './folder/folder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Folder } from './folder/folder.entity';
import { Photo } from './photo/photo.entity';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Folder, Photo],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PhotoModule,
    FolderModule,
    AuthModule,
    UsersModule,
    GcpModule,
  ],
})
export class AppModule {}
