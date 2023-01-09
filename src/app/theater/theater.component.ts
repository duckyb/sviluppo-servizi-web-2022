import { Component, Input } from '@angular/core';
import { DEFAULT_THEATER } from '../api.service';
import { cloneObject } from '../helpers';
import { SeatData, SeatSection, TheaterSeats } from '../types';

@Component({
  selector: 'theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent {
  @Input() data: TheaterSeats = cloneObject(DEFAULT_THEATER);

  public displayName: string = ' ';

  onSeatClick($event: Event) {
    const targetSeat = $event.target as HTMLDivElement;
    targetSeat.classList.toggle('selected')
  }

  onSeatHover($event: Event) {
    const targetSeat = $event.target as HTMLDivElement;
    const seatData = this.getSeatFromTarget(targetSeat);
    if (seatData) {
      this.displayName = this.data[seatData?.section][seatData?.row][seatData?.seat]
    }
  }

  clearName() {
    this.displayName = ' '
  }

  getSeatFromTarget(target: HTMLDivElement): SeatData | undefined {
    const seatID = target.getAttribute('id')?.split('-')
    if (seatID?.length === 3) {
      return {
        section: seatID[0] as SeatSection,
        row: +seatID[1],
        seat: +seatID[2],
      }
    } return undefined;
  }
}
