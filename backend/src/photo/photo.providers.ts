import { DataSource, Repository } from 'typeorm';
import { Photo } from './photo.entity';

export const photoProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Photo> =>
      dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'],
  },
];
