import { IsOptional, IsString } from 'class-validator';

export class UploadPhotoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  folderId?: string;
}
