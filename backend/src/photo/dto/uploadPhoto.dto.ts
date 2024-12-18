import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UploadPhotoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsPositive()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsString()
  mimeType: string;
}
