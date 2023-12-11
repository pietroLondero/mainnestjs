import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
// import { Curr } from '@pietro/common';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(userId: number) {

    return { "hello": this.appService.getHello(), "userId": userId };
  }
}
