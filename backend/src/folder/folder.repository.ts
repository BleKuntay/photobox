import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService {
  private folderRepository: Repository<Folder>;

  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.folderRepository = this.dataSource.getRepository(Folder);
  }

  async createFolder(
    folderName: string,
    parentFolderId?: string,
  ): Promise<Folder> {
    const folder = new Folder();
    folder.folderName = folderName;

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
    return await this.folderRepository.find();
  }

  async getFolderWithPhotos(folderId: string): Promise<Folder | null> {
    return await this.folderRepository.findOne({
      where: { folderId: folderId },
      relations: ['photos'],
    });
  }

  async deleteFolder(folderId: string): Promise<void> {
    const folder = await this.folderRepository.findOneBy({
      folderId: folderId,
    });
    if (!folder) {
      throw new Error('Folder not found');
    }
    await this.folderRepository.remove(folder);
  }
}
