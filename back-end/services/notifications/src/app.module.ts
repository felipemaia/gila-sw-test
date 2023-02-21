import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { UserSchema } from './schemas/user.schema';
import { ChannelSchema } from './schemas/channel.schema';
import { LogSchema } from './schemas/log.schema';
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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
