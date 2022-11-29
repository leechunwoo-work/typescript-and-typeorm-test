import { Entity, Column, ManyToOne } from 'typeorm';
import { Geometry } from 'geojson';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Bookmark extends DefaultEntity {
  // 제목
  @Column('varchar') title: string;

  // 주소
  @Column('varchar') address: string;

  // 주소의 위도, 경도 (x, y)
  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 }) geoPoint: Geometry;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;
}
