import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {BookService} from '../../../../services/services/book.service';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';
import {BookCardComponent} from '../../components/book-card/book-card.component';




@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,
                RouterModule, BookCardComponent],

  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  message = '';
  level = 'success'

  constructor(
    private bookService: BookService,
    private router: Router
    ) {
      }

  ngOnInit(): void {
    this.findAllBooks();
    }

  private findAllBooks() {

    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
      }).subscribe({
        next: (books: any) => {
          this.bookResponse = books;
          }
        });
}

goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

get isLastPage(): boolean {
  return this.page == this.bookResponse.totalPages as number - 1;
  }

borrowBook(book: BookResponse) {
  this.message = '';
  this.bookService.borrowBook({
    'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
        },
      error: (err) => {
        this.level = 'error';
        this.message = err.error.error;
        }
      })
  }
  }

