import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'theater-selector',
  template: `
    <div class="theater-selector">
        <!-- THEATER LINK -->
        <a routerLink="/{{theaterID}}" class="theater-selector__wrapper">
          <div class="theater-selector__theater">
            View theater #{{theaterID}}
          </div>
        </a>
        <!-- BUTTON DELETE -->
        <div
          class="theater-selector__delete"
          title="delete theater"
          (click)="onDelete.emit(theaterID)">
            <img src="assets/delete-icon.png" alt="delete icon" class="delete-icon">
        </div>
    </div>
  `,
  styleUrls: ['./theater-selector.component.scss']
})
export class TheaterSelectorComponent {
  @Input() theaterID = '';

  @Output() onDelete = new EventEmitter();
}
