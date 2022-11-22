import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { Todo, Character, Bookmark, Notification } from './';

@Entity()
export class User extends DefaultEntity {
  // 일반 로그인에서 아이디 대신할 컬럼, 소셜 로그인은 없다.
  @Column('varchar', { nullable: true }) email?: string | null;

  // 일반 로그인을 위한 컬럼, 소셜 로그인은 없다.
  @Column('varchar', { length: 64, nullable: true }) password?: string | null;

  // UI에 표시할 이름, 사용자끼리 식별시 사용
  @Column('varchar', { length: 16, nullable: true }) nickname?: string | null;

  // 알림을 위한 컬럼, 서버가 파이어베이스에 메시지를 요청할 때 사용
  @Column('varchar', { length: 163, nullable: true, unique: true }) notificationToken?: string | null;

  // 소셜 로그인을 위한 컬럼, 회원가입 시 닉네임 입력전에 뒤로가기 했을 경우를 위해 저장 필요, 일반 로그인은 없다.
  @Column('varchar', { nullable: true }) oAuthUID?: string | null;

  // 인증 상태를 구분하기 위한 컬럼
  @Column('int') authenticationStatus: number;

  // 로그인 종류(일반,애플,페이스북 등) 구분 시 필요
  @Column('int') authenticationType: number;

  // 관리자와 일반 회원을 구분하기 위해 필요
  @Column('int') authenticationLevel: number;

  // 새 알림 숫자를 표시하기 위해 필요
  @Column('int', { default: 0 }) newNotificationCount: number;

  // 챌린지(todo) 알림을 보낼지 여부를 확인하기 위해 필요
  @Column('boolean', { default: true }) isChallengeNotificationEnabled: boolean;

  // 초미세 먼지 알림을 보낼지 여부를 확인하기 위해 필요
  @Column('boolean', { default: true }) isUltrafineDustNotificationEnabled: boolean;

  // 1:n 하나의 유저는 여러 캐릭터를 가질 수 있다.
  @OneToMany(() => Character, character => character.user) characters: Character[];

  // 1:n 하나의 유저는 여러 즐겨찾기 항목을 가질 수 있다.
  @OneToMany(() => Bookmark, bookmark => bookmark.user) bookmarks: Bookmark[];

  // 1:n 하나의 유저는 여러 알림 메시지를 가질 수 있다.
  @OneToMany(() => Notification, notification => notification.user) notifications: Notification[];

  // n:m 하나의 유저는 여러 챌린지(todo)를 가질 수 있고, 하나의 챌린지는 여러 유저를 가질수 있다.
  @ManyToMany(() => Todo, { cascade: true }) @JoinTable({ name: 'user_todo' }) todos: Todo[];
}
