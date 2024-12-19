import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  folderId: string;

  @Column({ length: 255 })
  folderName: string;

  @ManyToOne(() => Folder, (folder) => folder.children, { onDelete: 'CASCADE' })
  parent: Folder;

  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[];

  @OneToMany(() => Photo, (photo) => photo.folder)
  photos: Photo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
