import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { photoProviders } from './photo.providers';
import { DatabaseModule } from '../database/database.module';
import { GcpModule } from '../gcp/gcp.module';

@Module({
  imports: [DatabaseModule, GcpModule],
  controllers: [PhotoController],
  providers: [PhotoService, ...photoProviders],
  exports: [PhotoService],
})
export class PhotoModule {}
