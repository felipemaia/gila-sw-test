import { Controller, Post, Body, Sse, Get } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { AppService } from './app.service';
import { MessageDto } from './dtos/message.dto';
import { NotificationEvent } from './interfaces/notification.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('message')
  messageHandler(@Body() message: MessageDto): Promise<string> {
    return this.appService.messageHandler(message);
  }
  @Get('log')
  retrieveFullLog() {
    return this.appService.retrieveFullLog();
  }

  @Sse('event')
  sendEvent(): Observable<NotificationEvent> {
    return this.appService.sendEvent();
  }
}
