import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { Response } from 'express';

@Controller('api/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  public getAllPhotos(): Promise<Photo[]> {
    return this.photoService.getAllPhotosService();
  }

  @Get('/:id')
  public getPhotoById(@Param('id') id: string): Promise<Photo> {
    return this.photoService.getPhotoByIdService(id);
  }

  @Delete('/:id')
  public async deletePhoto(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const deleted = await this.photoService.deletePhoto(id);

    if (!deleted) {
      throw new NotFoundException('Photo not found: ', id);
    }

    return { message: `Deleted photo: ${id}` };
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPhotoDto: UploadPhotoDto,
  ): Promise<Photo> {
    return this.photoService.uploadPhoto(uploadPhotoDto, file);
  }

  @Get('/:id/download')
  async downloadPhoto(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const fileStream = await this.photoService.downloadPhoto(id);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileStream.filename}"`,
      );
      res.setHeader('Content-Type', 'application/octet-stream');
      fileStream.stream.pipe(res);
    } catch (error) {
      console.error('Error downloading photo:', error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('/:id/rename')
  async renamePhoto(
    @Param('id') id: string,
    @Body('newName') newName: string,
  ): Promise<{ message: string }> {
    try {
      await this.photoService.renamePhoto(id, newName);
      return { message: 'Photo renamed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
