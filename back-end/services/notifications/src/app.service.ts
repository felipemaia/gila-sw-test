import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MessageDto } from './dtos/message.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { User, UserDocument } from './schemas/user.schema';
import { Channel, ChannelDocument } from './schemas/channel.schema';
import { Log, LogDocument } from './schemas/log.schema';
import { PushNotificationService as pushnotification } from './notification/push-notification/push-notification.service';
import { SMSService as sms } from './notification/sms/sms.service';
import { EmailService as email } from './notification/email/email.service';
import { Observable, interval, map } from 'rxjs';
import { NotificationEvent } from './interfaces/notification.interface';
@Injectable()
export class AppService {
  private lastUpdate: Array<Object> = [];
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  async messageHandler(message: MessageDto): Promise<string> {
    if (message.category == null || message.text == null)
      throw new HttpException(
        'Category or text not filled. Please inser a valid category and a text with at least ONE character',
        HttpStatus.BAD_REQUEST,
      );
    const result = await this.checkCategory(message.category);
    if (result != null) {
      const classes = { pushnotification, sms, email };
      //Get all users that match this category (by id) and for each type of notification, call a different class
      const channelList = await this.getChannelList(); //To know what class must be called
      const userList = await this.getUsersByCategoryId(result.id);

      userList.map((user) => {
        user.channels.map((channel) => {
          //Gets (converts) the name of the notification that must be sent
          let className =
            channelList[channelList.findIndex((ch) => ch.id === channel)].name;
          this.insertNewLog(user, message.category, className).then(
            (result) => {
              this.lastUpdate.push({ data: result });
            },
          );

          className = className.toLowerCase().replace(/-|\s/g, '');
          let classInstance = new classes[className]();
          classInstance.messageHandler(user);
        });
      });
      return;
    } else {
      throw new HttpException(
        'Category does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkCategory(categoryName: string) {
    const category = await this.categoryModel.findOne({ name: categoryName });
    return category;
  }

  async getUsersByCategoryId(categoryId: string) {
    const userList = await this.userModel.find({ subscribed: categoryId });
    return userList;
  }

  async getChannelList() {
    const channelList = await this.channelModel.find();
    return channelList;
  }

  async insertNewLog(user: User, category: string, channel: string) {
    const data = new this.logModel();
    data.name = user.name;
    data.email = user.email;
    data.phone = user.phone;
    data.channel = channel;
    data.category = category;

    const result = await data.save();
    return result;
  }

  retrieveFullLog() {
    return this.logModel
      .find({}, { updatedAt: 0, __v: 0 })
      .sort({ createdAt: -1 });
  }

  sendEvent(): Observable<NotificationEvent> {
    return interval(500).pipe(
      map((_) => {
        if (this.lastUpdate.length > 0)
          return { data: { message: this.lastUpdate.shift() } };
        else return;
      }),
    );
  }
}
