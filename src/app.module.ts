import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TasksModule, UsersModule, AuthModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
