import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
import { FeedbackRequest } from '../../../../services/models/feedback-request'
import {BookService} from '../../../../services/services/book.service';
import {FeedbackService} from '../../../../services/services/feedback.service';
import { RatingComponent } from '../../components/rating/rating.component';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-borrowed-book-list',
    standalone: true,
      imports: [CommonModule,
                    RouterModule, RatingComponent, FormsModule],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {

    borrowedBooks: { content: BorrowedBookResponse[]; totalPages: number } = {
      content: [],
      totalPages: 0
    };
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};
    page = 0;
    size = 5;
    selectedBook: BookResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
    ) {}

  ngOnInit(): void {
      this.findAllBorrowedBooks();
    }

  returnBook(withFeedback: boolean) {
      this.bookService.returnedBorrowBook({
        'book-id': this.selectedBook?.id as number
      }).subscribe({
        next: () => {
          if (withFeedback) {
            this.giveFeedback();
          }
          this.selectedBook = undefined;
          this.findAllBorrowedBooks();
        }
      });
    }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
      }).subscribe({
        next: () => {

          }
        })
    }

  returnBorrowedBook(book: BorrowedBookResponse) {
      this.selectedBook = book;
      this.feedbackRequest.bookId = book.id as number;
    }

  gotToPage(page: number) {
      this.page = page;
      this.findAllBorrowedBooks();
    }

    goToFirstPage() {
      this.page = 0;
      this.findAllBorrowedBooks();
    }

    goToPreviousPage() {
      this.page --;
      this.findAllBorrowedBooks();
    }

    goToLastPage() {
      this.page = this.borrowedBooks.totalPages as number - 1;
      this.findAllBorrowedBooks();
    }

    goToNextPage() {
      this.page++;
      this.findAllBorrowedBooks();
    }

    get isLastPage() {
      return this.page === this.borrowedBooks.totalPages as number - 1;
    }

  private findAllBorrowedBooks() {
      this.bookService.findAllBorrowedBooks({
        page: this.page,
        size: this.size
      }).subscribe({
        next: (res: any) => {
          this.borrowedBooks = res;
          }
        })
    }

}
