import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { User } from '../users/users.entity';

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

  @ManyToOne(() => Folder, (folder) => folder.photos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @Column({ nullable: true })
  folderId: string;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
