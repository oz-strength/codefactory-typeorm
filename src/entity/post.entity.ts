import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagModel } from './tag.entity';
import { UserModel } from './user.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  author!: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags!: TagModel[];

  @Column()
  title!: string;
}
