import { Controller, Post, Body, Sse } from '@nestjs/common';
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

  @Sse('event')
  sendEvent(): Observable<NotificationEvent> {
    return interval(1000).pipe(
      map((num: number) => ({
        data: 'hello' + num,
      })),
    );
  }
}
