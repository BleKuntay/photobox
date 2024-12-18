import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity('folder')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  folderId: string;

  @Column({ length: 255 })
  folderName: string;

  @OneToMany(() => Photo, (photo) => photo.folder)
  photos: Photo[];

  @CreateDateColumn()
  created_at: Date;
}
