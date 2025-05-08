import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../../../services/models/book-response';
import {RatingComponent} from '../../components/rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
    imports: [CommonModule,
                  RouterModule, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book: BookResponse | undefined;
  private _manage = false;
  private _bookCover: string | undefined;

  get bookCover(): string {
    if (this._book && this._book.cover) {
      return 'data:image/jpg;base64, ' + this._book.cover;
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcc23JSxwzVmR5dT6iZyojv7c2Hl0cbk3lyQ&s';
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  get book(): BookResponse {
    if (!this._book) {
      throw new Error('Book not set');
    }
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value ?? {};
  }

  get manage(): boolean {
      return this._manage;
    }

    @Input()
    set manage(value: boolean) {
      this._manage = value;
    }

  onShare() {
      this.share.emit(this._book);
    }

    onArchive() {
      this.archive.emit(this._book);
    }

    onAddToWaitingList() {
      this.addToWaitingList.emit(this._book);
    }

    onBorrow() {
      this.borrow.emit(this._book);
    }

    onEdit() {
      this.edit.emit(this._book);
    }

    onShowDetails() {
      this.details.emit(this._book);
    }


}
