import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() previous : EventEmitter<void> = new EventEmitter<void>();
  @Output() next : EventEmitter<void> = new EventEmitter<void>();

  protected previousPage(): void {
    if (this.currentPage > 1) {
      this.previous.emit();
    }
  }
  protected nextPage() : void {
    if (this.currentPage < this.totalPages) {
      this.next.emit();
    }
  }
}

