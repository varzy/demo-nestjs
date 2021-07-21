import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({ autoLoadEntities: true }), PostsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
