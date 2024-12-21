import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  parentId?: string;
}
