import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  postUser() {
    return this.userRepository.save({});
  }

  @Get('users')
  getHello() {
    return this.userRepository.find({});
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

    const post3 = await this.postRepository.save({
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
