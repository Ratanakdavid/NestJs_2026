import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      author: user,
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: {
        author: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<Post> {
    const post = await this.findOne(id);

    this.checkOwnership(post, user);

    Object.assign(post, updatePostDto);

    return this.postRepository.save(post);
  }

  async remove(id: number, user: User): Promise<Post> {
    const post = await this.findOne(id);

    this.checkOwnership(post, user);

    await this.postRepository.remove(post);

    return post;
  }

  private checkOwnership(post: Post, user: User): void {
    if (post.author.id !== user.id) {
      throw new ForbiddenException('You can modify only your own post');
    }
  }
}
