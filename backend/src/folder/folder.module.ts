import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { GcpModule } from '../gcp/gcp.module';
import { Photo } from '../photo/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Photo]), GcpModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService, TypeOrmModule],
})
export class FolderModule {}
