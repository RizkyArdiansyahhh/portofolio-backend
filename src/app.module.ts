import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/database/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './infra/auth/auth';
import { ProjectsModule } from './module/projects/projects.module';
import { UploadModule } from './module/upload/upload.module';
import { ExperienceModule } from './module/experience/experience.module';
import { StackModule } from './module/stack/stack.module';
import { PublicationModule } from './module/publication/publication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule.forRoot({auth}),
    PrismaModule,
    ProjectsModule,
    UploadModule,
    ExperienceModule,
    StackModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
