import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {

    constructor(
        @InjectRepository(Book) // Inject the Book repository
        private bookRepository: Repository<Book> // Inject the repository for Book entity
    ) { }

    @Get('/')
    listAll() {
        return this.bookRepository.find(); 
    }

    @Get('/:id')
    async find(@Param('id') id: number) {
        const livro = await this.bookRepository.findOneBy({ id });
        if (!livro) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return livro;
    }

    @Post('/')
    async create(@Body() book: BookDTO) {
        const newBook = new Book();
        
        newBook.title = book.title;
        newBook.author = book.author;
        newBook.isbn = book.isbn;

        return this.bookRepository.save(newBook); // Save the new book to the database
    }
}
