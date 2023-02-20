import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from './schemas/category.schema';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getCategoryList')
  getCategoryList(): Promise<Category[]> {
    return this.appService.getCategoryList();
  }
}
