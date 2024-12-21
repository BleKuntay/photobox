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
  UseGuards,
  Request,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(
    @Request() req,
    @Body() createFolderDto: CreateFolderDto,
  ): Promise<Folder> {
    try {
      return await this.folderService.createFolder(
        req.user.id,
        createFolderDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllFolders(@Request() req): Promise<Folder[]> {
    return await this.folderService.getAllFolders(req.user.id);
  }

  @Get('/:id')
  async getFolderWithPhotos(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Folder> {
    try {
      return await this.folderService.getFolderWithPhotos(id, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/rename')
  async renameFolder(
    @Param('id') folderId: string,
    @Request() req,
    @Body() renameFolderDto: RenameFolderDto,
  ): Promise<{ message: string }> {
    try {
      await this.folderService.renameFolder(
        folderId,
        req.user.id,
        renameFolderDto,
      );
      return { message: 'Folder renamed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  async deleteFolder(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ message: string }> {
    try {
      await this.folderService.deleteFolder(id, req.user.id);
      return { message: 'Folder deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
