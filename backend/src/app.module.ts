import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoController } from './photo/photo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PhotoController],
  providers: [],
})
export class AppModule {}
