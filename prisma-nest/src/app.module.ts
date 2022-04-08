import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/user.module';
import { UserService } from './users/user.service';
import { PostService } from './post/post.service';

@Module({
  imports: [PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}
