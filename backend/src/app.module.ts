import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';
import { GcpModule } from './gcp/gcp.module';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    PhotoModule,
    GcpModule,
  ],
  controllers: [PhotoController, FolderController],
  providers: [FolderService],
})
export class AppModule {}
