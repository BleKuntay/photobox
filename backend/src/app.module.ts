import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { GcpModule } from './gcp/gcp.module';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';
import { FolderModule } from './folder/folder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Folder } from './folder/folder.entity';
import { Photo } from './photo/photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'photobox',
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
