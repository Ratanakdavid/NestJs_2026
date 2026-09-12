import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  private nextId = 1;

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.nextId++,
      title: createPostDto.title,
      content: createPostDto.content,
    };

    this.posts.push(newPost);

    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);

    if (updatePostDto.title !== undefined) {
      post.title = updatePostDto.title;
    }

    if (updatePostDto.content !== undefined) {
      post.content = updatePostDto.content;
    }

    return post;
  }

  remove(id: number): {
    deleted: boolean;
    post: Post;
  } {
    const post = this.findOne(id);

    this.posts = this.posts.filter((post) => post.id !== id);

    return {
      deleted: true,
      post,
    };
  }
}
