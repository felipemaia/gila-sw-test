import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorySchema } from './schemas/category.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL +
        ':' +
        process.env.MONGO_DB_PORT +
        '/' +
        process.env.MONGO_DB_NAME,
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
        autoIndex: true,
      },
    ),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
