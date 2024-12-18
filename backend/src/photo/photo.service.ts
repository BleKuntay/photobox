import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { UploadPhotoDto } from './dto/uploadPhoto.dto';
import { GCPProviders } from '../gcp/gcp.providers';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private readonly photoRepository: Repository<Photo>,
    private readonly gcpRepository: GCPProviders,
  ) {}

  public getAllPhotosService(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  public async getPhotoByIdService(id: string): Promise<Photo> {
    const photo: Photo = await this.photoRepository.findOne({
      where: { id },
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    return photo;
  }

  public async uploadPhoto(
    uploadPhotoDto: UploadPhotoDto,
    file: Express.Multer.File,
  ): Promise<Photo> {
    const name = uploadPhotoDto.name || file.originalname;
    const destination = `photos/${name}`;

    const photoUrl = await this.gcpRepository.uploadPhoto(file, destination);

    const photo = this.photoRepository.create({
      ...uploadPhotoDto,
      name,
      url: photoUrl,
      size: file.size,
      mimeType: file.mimetype,
    });

    return this.photoRepository.save(photo);
  }

  async renamePhoto(id: string, newName: string): Promise<void> {
    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo) {
      throw new Error('Photo not found');
    }

    const oldFileName = `photos/${photo.name}`; // Path lengkap di bucket
    const newFileName = `photos/${newName}`;

    // Validasi nama baru
    const existingPhoto = await this.photoRepository.findOneBy({ name: newName });
    if (existingPhoto) {
      throw new Error('A photo with the new name already exists');
    }

    // Rename file di bucket
    try {
      await this.gcpRepository.renamePhoto(oldFileName, newFileName);
      console.log(`Renamed photo: ${oldFileName} -> ${newFileName}`);
    } catch (error) {
      throw new Error(`Failed to rename photo: ${error.message}`);
    }

    // Update nama file di database
    photo.name = newName; // Hanya nama tanpa prefix
    await this.photoRepository.save(photo);
  }


  public async deletePhoto(id: string): Promise<boolean> {
    const photo = await this.photoRepository.findOneBy({ id });

    console.log(`Filename to delete: ${photo.name}`);

    if (!photo) {
      return false;
    }

    const fullFilePath = `photos/${photo.name}`;

    try {
      await this.gcpRepository.deletePhoto(fullFilePath);
      console.log(`Photo '${photo.name}' deleted from bucket`);
    } catch (error) {
      console.error(`Failed to delete file from bucket: ${error.message}`);
      throw new Error('Failed to delete file from bucket');
    }

    const result = await this.photoRepository.delete(id);
    return result.affected > 0;
  }

  async downloadPhoto(
    id: string,
  ): Promise<{ stream: NodeJS.ReadableStream; filename: string }> {
    const photo = await this.photoRepository.findOneBy({ id });

    if (!photo) {
      throw new Error('Photo not found');
    }

    const stream = await this.gcpRepository.downloadPhoto(photo.name);

    return {
      stream,
      filename: photo.name.split('/').pop(),
    };
  }
}
