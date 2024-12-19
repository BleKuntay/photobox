import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { GcpModule } from './gcp/gcp.module';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';
import { FolderModule } from './folder/folder.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      autoLoadEntities: true,
      synchronize: true,
    }),
    PhotoModule,
    GcpModule,
    FolderModule,
  ],
  controllers: [PhotoController, FolderController],
  providers: [FolderService],
})
export class AppModule {}
