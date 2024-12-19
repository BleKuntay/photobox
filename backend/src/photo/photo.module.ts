import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { photoProviders } from './photo.providers';
import { DatabaseModule } from '../database/database.module';
import { GcpModule } from '../gcp/gcp.module';
import { FolderModule } from '../folder/folder.module';
import { Photo } from './photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    DatabaseModule,
    GcpModule,
    FolderModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, ...photoProviders],
  exports: [PhotoService],
})
export class PhotoModule {}
