import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Folder } from '../folder/folder.entity';
import { GCPProviders } from '../gcp/gcp.providers';
import { UploadPhotoDto } from './dto/upload.photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,

    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,

    private readonly gcpRepository: GCPProviders,
  ) {}

  public async getAllPhotosService(userId: string): Promise<Photo[]> {
    return this.photoRepository.find({ where: { userId } });
  }

  public async getPhotoById(id: string, userId: string): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { id, userId } });

    if (!photo) {
      throw new Error('Photo not found or you do not have access');
    }

    return photo;
  }

  public async uploadPhoto(
    uploadPhotoDto: UploadPhotoDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<Photo> {
    const name = uploadPhotoDto.name || file.originalname;
    const destination = `photos/${userId}/${name}`;

    const photoUrl = await this.gcpRepository.uploadPhoto(file, destination);

    let folder = null;

    if (uploadPhotoDto.folderId) {
      folder = await this.folderRepository.findOne({
        where: { id: uploadPhotoDto.folderId, userId },
      });
      if (!folder) {
        throw new Error(`Folder with ID ${uploadPhotoDto.folderId} not found`);
      }
    }

    const photo = this.photoRepository.create({
      name,
      url: photoUrl,
      size: file.size,
      mimeType: file.mimetype,
      folder,
      userId,
    });

    return this.photoRepository.save(photo);
  }

  public async deletePhoto(id: string, userId: string): Promise<boolean> {
    const photo = await this.photoRepository.findOne({ where: { id, userId } });

    if (!photo) {
      return false;
    }

    const fullFilePath = `photos/${userId}/${photo.name}`;

    try {
      await this.gcpRepository.deletePhoto(fullFilePath);
      console.log(`Photo '${photo.name}' deleted from bucket`);
    } catch (error) {
      console.error(`Failed to delete file from bucket: ${error.message}`);
      throw new Error('Failed to delete file from bucket');
    }

    const result = await this.photoRepository.delete({ id, userId });
    return result.affected > 0;
  }

  public async downloadPhoto(
    id: string,
    userId: string,
  ): Promise<{ stream: NodeJS.ReadableStream; filename: string }> {
    const photo = await this.photoRepository.findOne({ where: { id, userId } });

    if (!photo) {
      throw new Error('Photo not found or you do not have access');
    }

    const stream = await this.gcpRepository.downloadPhoto(
      `photos/${userId}/${photo.name}`,
    );

    return {
      stream,
      filename: photo.name.split('/').pop(),
    };
  }

  public async renamePhoto(
    id: string,
    newName: string,
    userId: string,
  ): Promise<void> {
    const photo = await this.photoRepository.findOne({ where: { id, userId } });

    if (!photo) {
      throw new Error('Photo not found');
    }

    const oldFileName = `photos/${userId}/${photo.name}`;
    const newFileName = `photos/${userId}/${newName}`;

    const existingPhoto = await this.photoRepository.findOne({
      where: { name: newName, userId },
    });
    if (existingPhoto) {
      throw new Error('A photo with the new name already exists');
    }

    try {
      await this.gcpRepository.renamePhoto(oldFileName, newFileName);
      console.log(`Renamed photo: ${oldFileName} -> ${newFileName}`);
    } catch (error) {
      throw new Error(`Failed to rename photo: ${error.message}`);
    }

    photo.name = newName;
    await this.photoRepository.save(photo);
  }
}
