import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDto } from './dto/upload.photo.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Photo } from './photo.entity';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  public async getAllPhotos(@Request() req): Promise<Photo[]> {
    const userId = req.user.id;
    return this.photoService.getAllPhotosService(userId);
  }

  @Get('/:id')
  public async getPhotoById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Photo> {
    const userId = req.user.id;
    return this.photoService.getPhotoById(id, userId);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPhotoDto: UploadPhotoDto,
    @Request() req,
  ): Promise<Photo> {
    const userId = req.user.id;
    return this.photoService.uploadPhoto(uploadPhotoDto, file, userId);
  }

  @Delete('/:id')
  public async deletePhoto(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const isDeleted = await this.photoService.deletePhoto(id, userId);

    if (!isDeleted) {
      throw new HttpException(
        'Photo not found or access denied',
        HttpStatus.NOT_FOUND,
      );
    }

    return { message: 'Photo deleted successfully' };
  }

  @Get('/:id/download')
  public async downloadPhoto(
    @Param('id') id: string,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user.id;

    try {
      const fileStream = await this.photoService.downloadPhoto(id, userId);
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
  public async renamePhoto(
    @Param('id') id: string,
    @Body('newName') newName: string,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.id;

    try {
      await this.photoService.renamePhoto(id, newName, userId);
      return { message: 'Photo renamed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
