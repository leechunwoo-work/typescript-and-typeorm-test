import { Entity, Column, ManyToOne } from 'typeorm';
import { Geometry } from 'geojson';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Bookmark extends DefaultEntity {
  @Column() title: string;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 }) geoPoint: Geometry;

  @Column({ default: false }) isDeleted: boolean;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;
}
