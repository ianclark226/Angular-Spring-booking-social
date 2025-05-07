import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {BookRequest} from '../../../../services/models/book-request';
import {BookService} from '../../../../services/services/book.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-book',
  standalone: true,
      imports: [CommonModule,
                    RouterModule, FormsModule ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
    shareable: false
  };

constructor(
  private bookService: BookService,
  private router: Router
  ) {}

  onFileSelected(event: any) {
      this.selectedBookCover = event.target.files[0];
      console.log(this.selectedBookCover);

      if (this.selectedBookCover) {

        const reader = new FileReader();
        reader.onload = () => {
          this.selectedPicture = reader.result as string;
        };
        reader.readAsDataURL(this.selectedBookCover);
      }
    }

  saveBook() {

    this.bookService.saveBook({
      body: this.bookRequest
      }).subscribe({
        next: (bookId) => {
          this.bookService.uploadBookCoverPicture({
            'book-id': bookId,
            body: {
            file: this.selectedBookCover
            }
            }).subscribe({
              next: () => {
                this.router.navigate(['/books/my-books'])
                }
              })
          },
        error: (err: any) => {
          console.error('Save book error:', err);
          this.errorMsg = Array.isArray(err.error?.validationErrors)
            ? err.error.validationErrors
            : ['An unexpected error occurred.'];
        }
        })

    }
  }
