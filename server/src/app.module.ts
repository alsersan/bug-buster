import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { LogsMiddleware } from './middlewares/logs.middleware';
import { TicketsModule } from './tickets/tickets.module';
import { LoginModule } from './login/login.module';
import { VerifyJwtToken } from './middlewares/verify-token.middleware';
import { ProjectsController } from './projects/projects.controller';
import { UsersController } from './users/users.controller';
import { TicketsController } from './tickets/tickets.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './guards/authorization.guard';
import { CommentsModule } from './comments/comments.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    ProjectsModule,
    TicketsModule,
    LoginModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
    consumer
      .apply(VerifyJwtToken)
      .forRoutes(UsersController, ProjectsController, TicketsController);
  }
}
