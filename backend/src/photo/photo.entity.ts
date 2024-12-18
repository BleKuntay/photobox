import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Folder } from '../folder/folder.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  url: string;

  @Column({ type: 'bigint', default: 0 })
  size: number;

  @Column({ length: 50 })
  mimeType: string;

  @ManyToOne(() => Folder, (folder) => folder.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @Column({ nullable: true })
  folderId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
