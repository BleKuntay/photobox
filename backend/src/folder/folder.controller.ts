import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param, Patch,
  Post
} from "@nestjs/common";
import { FolderService } from './folder.service';
import { Folder } from './folder.entity';
import { RenameFolderDto } from "./dto/renameFolder.dto";

@Controller('api/folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(
    @Body('name') name: string,
    @Body('parentFolderId') parentFolderId?: string,
  ): Promise<Folder> {
    try {
      return await this.folderService.createFolder(name, parentFolderId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllFolders(): Promise<Folder[]> {
    return await this.folderService.getAllFolders();
  }

  @Get('/:id')
  async getFolderWithPhotos(@Param('id') id: string): Promise<Folder> {
    try {
      return await this.folderService.getFolderWithPhotos(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id/rename')
  async renameFolder(
    @Param('id') folderId: string,
    @Body() renameFolderDto: RenameFolderDto,
  ): Promise<{ message: string }> {
    const { newName } = renameFolderDto;

    try {
      await this.folderService.renameFolder(folderId, newName);
      return { message: 'Folder renamed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  async deleteFolder(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.folderService.deleteFolder(id);
      return { message: 'Folder deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
