import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  // 제목
  @Column()
  title!: string;

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
}
