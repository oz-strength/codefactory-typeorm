import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { PostModel } from './post.entity';
import { ProfileModel } from './profile.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.
  //
  // @PrimaryGeneratedColumn()
  // Primary Column은 모든 엔티티에서 반드시 하나 이상 존재해야 한다.
  // 테이블 안에서 각자의 Row를 구분하기 위한 컬럼이다.
  // @PrimaryColumn()
  //
  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
  //
  // UUID
  // UUID는 Universally Unique Identifier의 약자로, 전 세계적으로 고유한 식별자를 생성하는 방법.
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  // 제목
  // @Column({
  //   // 데이터베이스에서 인지하는 칼럼 타입
  //   // 자동으로 유추됨
  //   type: 'varchar',
  //   // 데이터베이스 칼럼 이름
  //   // 프로퍼티 이름으로 자동으로 유추됨
  //   name: 'title',
  //   // 값의 길이
  //   // 입력 할 수 있는 글자의 길이가 300
  //   length: 300,
  //   // null이 가능한지
  //   nullable: false,
  //   // true면 처음 저장할때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: false,
  //   // find()를 실행할때 기본으로 값을 불러올지
  //   // 기본값이 true
  //   select: false,
  //   // 기본 값
  //   // 아무것도 입력 안했을때 기본으로 입력되게 되는 값
  //   default: 'default title',
  //   // 칼럼중에서 유일한 값이 돼야하는지
  //   unique: false,
  // })
  // title!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  // 데이터 생성 날짜
  @CreateDateColumn()
  createdAt!: Date;

  // 데이터 업데이트 날짜
  @UpdateDateColumn()
  updatedAt!: Date;

  // 데이터가 업데이트 될 때마다 버전이 1씩 증가한다.
  // 처음 데이터가 생성될 때 버전은 1이 된다.
  // save() 함수가 호출될 때마다 버전이 1씩 증가한다.
  @VersionColumn()
  version!: number;

  @Column()
  @Generated('uuid')
  additionalId!: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  profile!: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts!: PostModel[];
}
