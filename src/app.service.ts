import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to GIC Vacation Crash Course 2026!';
  }

  getAbout() {
    return {
      course: 'Modern Backend Development with NestJS',
      week: 1,
      topic: 'Backend Basics, Node.js, npm, and NestJS Introduction',
    };
  }
}
