import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { GcpModule } from '../gcp/gcp.module';
import { FolderModule } from '../folder/folder.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), GcpModule, FolderModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService, TypeOrmModule],
})
export class PhotoModule {}
