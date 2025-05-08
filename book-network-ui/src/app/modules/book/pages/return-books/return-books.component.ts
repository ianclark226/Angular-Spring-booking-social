import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../../services/services/book.service';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit {

  returnedBooks: PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 5;
  message = '';
  level = 'success';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllreturnedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllreturnedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllreturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllreturnedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllreturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllreturnedBooks();
  }

  get isLastPage() {
    return this.page === (this.returnedBooks.totalPages as number) - 1;
  }

  private findAllreturnedBooks() {
    this.bookService.findAllreturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res: any) => {
        console.log(res); // Debug
        this.returnedBooks = res;

      }
    });
  }

approveBookReturn(book: BorrowedBookResponse) {
  if(!book.returned) {
    this.level = 'error';
    this.message = 'Book has not been returned'
    return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
      }).subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book return approved'
          this.findAllreturnedBooks()
          }
        })
  }
}
