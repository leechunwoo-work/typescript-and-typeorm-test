import { Entity, Column, ManyToOne } from 'typeorm';
import { Point } from 'geojson';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Bookmark extends DefaultEntity {
  // 제목
  @Column('varchar') title: string;

  // 주소의 위도, 경도 (x, y)
  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
    transformer: {
      from: p => p,
      to: p => `${p.coordinates[0]},${p.coordinates[1]}`,
    },
  })
  geoPoint: Point;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;
}
