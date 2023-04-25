import { Module } from '@nestjs/common';
import { DatabaseModule } from './mongo.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {}
