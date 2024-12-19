import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { GCPProviders } from '../gcp/gcp.providers';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly gcpRepository: GCPProviders,
  ) {}

  async createFolder(name: string, parentFolderId?: string): Promise<Folder> {
    const folder = new Folder();
    folder.folderName = name;

    if (parentFolderId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { folderId: parentFolderId },
      });

      if (!parentFolder) {
        throw new Error('Parent folder not found');
      }

      folder.parent = parentFolder;
    }

    return this.folderRepository.save(folder);
  }

  async getAllFolders(): Promise<Folder[]> {
    return await this.folderRepository.find({
      relations: ['parent'],
    });
  }

  async getFolderWithPhotos(folderId: string): Promise<Folder | null> {
    return await this.folderRepository.findOne({
      where: { folderId: folderId },
      relations: ['parent', 'photos'],
    });
  }

  async renameFolder(folderId: string, newName: string): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { folderId },
      relations: ['parent'],
    });

    if (!folder) {
      throw new Error('Folder not found');
    }

    const existingFolder = await this.folderRepository.findOne({
      where: {
        folderName: newName,
        parent: folder.parent,
      },
    });

    if (existingFolder) {
      throw new Error(
        'A folder with the same name already exists in this parent folder',
      );
    }

    folder.folderName = newName;
    await this.folderRepository.save(folder);
  }

  async deleteFolder(folderId: string): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { folderId },
      relations: ['photos', 'children'],
    });

    if (!folder) {
      throw new Error('Folder not found');
    }

    for (const photo of folder.photos) {
      try {
        await this.gcpRepository.deletePhoto(`photos/${photo.name}`);
        console.log(`Photo '${photo.name}' deleted from bucket`);
      } catch (error) {
        console.error(
          `Failed to delete photo '${photo.name}' from bucket: ${error.message}`,
        );
      }
    }

    if (folder.children && folder.children.length > 0) {
      for (const child of folder.children) {
        await this.deleteFolder(child.folderId);
      }
    }

    await this.folderRepository.remove(folder);
  }
}
