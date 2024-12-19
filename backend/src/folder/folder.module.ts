import { Module } from '@nestjs/common';
import { Folder } from './folder.entity';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { GcpModule } from '../gcp/gcp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), DatabaseModule, GcpModule], // Pastikan entity Folder diimpor
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService, TypeOrmModule], // Ekspor TypeOrmModule jika dibutuhkan oleh modul lain
})
export class FolderModule {}
