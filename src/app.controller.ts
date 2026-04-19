import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/profile.entity';
import { TagModel } from './entity/tag.entity';
import { UserModel } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@test.com`,
      });
    }
  }

  @Get('users')
  getHello() {
    return this.userRepository.find({
      where: {
        // id가 1이 아닌 유저를 찾는다.
        // id: Not(1),
        // id가 10보다 작은 유저를 찾는다.
        // id: LessThan(10),
        // id가 30보다 작거나 같은 유저를 찾는다.
        // id: LessThanOrEqual(30),
        // id가 90보다 큰 유저를 찾는다.
        // id: MoreThan(90),
        // id가 90보다 크거나 같은 유저를 찾는다.
        // id: MoreThanOrEqual(90),
        // id가 50인 유저를 찾는다.
        // id: Equal(50),
        // 유사값을 찾는다
        // email: Like('%0%'),
        // 대소문자 구분 없이 유사값을 찾는다.
        // email: ILike('%TEST%'),
        // 사이값
        // id: Between(10, 20),
        // 해당되는 여러개의 값
        // id: In([1, 10, 20, 30, 40, 50]),
        // id가 null인 유저를 찾는다.
        id: IsNull(),
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 선택한다.
      // 만약 select를 정의하지 않으면 모든 프로퍼티가 선택된다.
      // select를 정의하면 정의된 프로퍼티만 선택된다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      //
      // 필터링할 조건을 입력 - and 조건으로 작동한다.
      // where: {
      //   id: 1,
      //   version: 1,
      // },
      //
      // or 조건으로 작동하는 where
      // where: [
      //   {
      //     id: 1,
      //   },
      //   {
      //     version: 1,
      //   },
      // ],
      //
      // 관계를 가져오는 방법
      // relations: {
      //   profile: true,
      // },
      //
      // 오름차순, 내림차순
      // order: {
      //   id: 'DESC',
      // },
      //
      // 처음 몇개를 제외할지
      // skip: 5,
      //
      // 처음 몇개를 가져올지
      // take: 5,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
      email: user?.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@test.ai',
      profile: {
        profileImage: 'test.png',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImage: 'test.png',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({ email: 'postuser@test.com' });
    await this.postRepository.save({
      author: user,
      title: '첫 번째 게시글',
    });

    await this.postRepository.save({
      author: user,
      title: '두 번째 게시글',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostAndTags() {
    const post1 = await this.postRepository.save({
      title: '태그가 있는 게시글1',
    });

    const post2 = await this.postRepository.save({
      title: '태그가 있는 게시글2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'NestJS',
      posts: [post1],
    });

    await this.postRepository.save({
      title: '태그가 있는 게시글3',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
