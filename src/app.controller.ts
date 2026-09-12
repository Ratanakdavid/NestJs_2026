import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about')
  getAbout() {
    return this.appService.getAbout();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', message: 'NestJS API is running' };
  }
}
