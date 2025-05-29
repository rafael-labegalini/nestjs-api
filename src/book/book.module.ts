import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // Add your entities here
  controllers: [BookController], // Register the controller
})
export class BookModule {}
