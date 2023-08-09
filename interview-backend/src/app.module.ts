import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CitiesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/cities'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
