import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategoryList(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
