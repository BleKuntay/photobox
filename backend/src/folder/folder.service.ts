import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';
import { GCPProviders } from '../gcp/gcp.providers';
import { Photo } from '../photo/photo.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,

    private readonly gcpRepository: GCPProviders,
  ) {}

  async createFolder(
    userId: string,
    createFolderDto: CreateFolderDto,
  ): Promise<Folder> {
    const folder = this.folderRepository.create({
      name: createFolderDto.name,
      parentId: createFolderDto.parentId || null,
      userId,
    });

    if (createFolderDto.parentId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { id: createFolderDto.parentId, userId },
      });

      if (!parentFolder) {
        throw new Error('Parent folder not found or access denied');
      }

      folder.parent = parentFolder;
    }

    return this.folderRepository.save(folder);
  }

  async getAllFolders(userId: string): Promise<Folder[]> {
    return await this.folderRepository.find({
      where: { userId },
      relations: ['parent'],
    });
  }

  async getFolderWithPhotos(folderId: string, userId: string): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId, userId },
      relations: ['parent', 'photos'],
    });

    if (!folder) {
      throw new Error('Folder not found or access denied');
    }

    return folder;
  }

  async renameFolder(
    folderId: string,
    userId: string,
    renameFolderDto: RenameFolderDto,
  ): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId, userId },
      relations: ['parent'],
    });

    if (!folder) {
      throw new Error('Folder not found or access denied');
    }

    const existingFolder = await this.folderRepository.findOne({
      where: { name: renameFolderDto.newName, parent: folder.parent, userId },
    });

    if (existingFolder) {
      throw new Error(
        'A folder with the same name already exists in this parent folder',
      );
    }

    folder.name = renameFolderDto.newName;
    await this.folderRepository.save(folder);
  }

  async deleteFolder(folderId: string, userId: string): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId, userId },
      relations: ['photos', 'children'],
    });

    if (!folder) {
      throw new Error('Folder not found or access denied');
    }

    await Promise.all(
      folder.photos.map(async (photo) => {
        try {
          await this.gcpRepository.deletePhoto(`photos/${photo.name}`);
          console.log(`Photo '${photo.name}' deleted from bucket`);
          await this.photoRepository.remove(photo);
        } catch (error) {
          console.error(
            `Failed to delete photo '${photo.name}' from bucket: ${error.message}`,
          );
        }
      }),
    );

    if (folder.children && folder.children.length > 0) {
      await Promise.all(
        folder.children.map((child) => this.deleteFolder(child.id, userId)),
      );
    }

    try {
      await this.folderRepository.remove(folder);
      console.log(`Folder '${folder.name}' deleted successfully`);
    } catch (error) {
      console.error(
        `Failed to delete folder '${folder.name}': ${error.message}`,
      );
      throw new Error(`Failed to delete folder: ${folder.name}`);
    }
  }
}
