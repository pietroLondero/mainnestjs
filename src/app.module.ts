import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { User, UsersModule } from '@pietro/user'
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User, UsersModule, UsersService } from '@pietro/user';
// import { UsersService } from './user/users.service';
import { ModuloAModule } from '@pietro/modulo-a'
import { ModuloBModule } from '@pietro/modulo-b'
import { User } from '@pietro/user';
import { UsersModule } from '@pietro/user'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    ModuloBModule,
    ModuloAModule,
    // UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

