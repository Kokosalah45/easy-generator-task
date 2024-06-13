import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  getHello2() {
    const res = {
      dbUser: process.env.MONGO_INITDB_ROOT_USERNAME,
      dbPass: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbDatabase: process.env.MONGO_INITDB_DATABASE,
      dbUrl: process.env.MONGO_URL,
      x: 1,
    };
    return res;
  }
}
