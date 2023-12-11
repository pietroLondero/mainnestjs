import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, RolesModule } from '@pietro/auth';
import { BlogModule } from '@pietro/blog';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule, CategoriesModule } from '@pietro/products';
import { CommonModule } from '@pietro/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: 'example',
      dbName: 'nest',
    }),
    CommonModule,
    AuthModule,
    RolesModule,
    BlogModule,
    CategoriesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})

export class AppModule { }

