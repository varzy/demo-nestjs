import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { TagsModule } from './resources/tags/tags.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { AuthModule } from './libs/auth/auth.module';
import { TripsModule } from './resources/trips/trips.module';
import { ValidatorsModule } from './libs/validations/validators.module';
import { RolesModule } from './resources/roles/roles.module';
import { HousesModule } from './resources/houses/houses.module';
import { CitiesModule } from './resources/cities/cities.module';
import { CommentsModule } from './resources/comments/comments.module';

@Module({
  imports: [
    // Libs
    PrismaModule,
    ValidatorsModule,
    // Resources
    TripsModule,
    PostsModule,
    UsersModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
    RolesModule,
    HousesModule,
    CitiesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
