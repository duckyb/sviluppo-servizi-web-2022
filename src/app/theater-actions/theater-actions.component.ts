import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'theater-actions',
  template: `
    <div class="theater-actions__buttons card">
      <button (click)="saveSeats.emit()">Book Seats</button>
      <button (click)="resetSeats.emit()">Empty Theater</button>
    </div>`,
  styleUrls: ['./theater-actions.component.scss']
})
export class TheaterActionsComponent {
  @Output() saveSeats = new EventEmitter();
  @Output() resetSeats = new EventEmitter();
}
