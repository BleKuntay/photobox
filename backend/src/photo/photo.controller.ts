import { Controller, Get } from '@nestjs/common';

@Controller('api/photo')
export class PhotoController {
  @Get()
  test(): string {
    return 'This is photo API';
  }
}
