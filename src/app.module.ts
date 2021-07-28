import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { TagsModule } from './resources/tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { TripsModule } from './resources/trips/trips.module';

@Module({
  imports: [
    // Libs
    PrismaModule,
    // Resources
    PostsModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
