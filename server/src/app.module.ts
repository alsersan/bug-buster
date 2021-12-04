import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { LogsMiddleware } from './middlewares/logs.middleware';
import { TicketsModule } from './tickets/tickets.module';
import { ModificationsModule } from './modifications/modifications.module';
import { LoginModule } from './login/login.module';
import { VerifyJwtToken } from './middlewares/verify-token.middleware';
import { ProjectsController } from './projects/projects.controller';
import { UsersController } from './users/users.controller';
import { TicketsController } from './tickets/tickets.controller';
import { ModificationsController } from './modifications/modifications.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './guards/authorization.guard';

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
    ModificationsModule,
    LoginModule,
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
      .forRoutes(
        UsersController,
        ProjectsController,
        TicketsController,
        ModificationsController,
      );
  }
}
