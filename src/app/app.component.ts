import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ApiService, DEFAULT_THEATER, isValidSection, SeatData, TheaterSeats } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {
    this.apiService = apiService;
  }

  // two-way binding
  public username = '';

  public theaterUI = cloneDeep(DEFAULT_THEATER);

  ngOnInit(): void {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.username = savedUser;
    }
    this.updateTheater();
  }

  handleInputChange(event: any) {
    this.username = event.target.value;
    if (typeof this.username === 'string' && this.username.length > 0) {
      localStorage.setItem('username', this.username);
    }
  }

  updateTheater() {
    this.apiService.getSeats$().subscribe({
      next: (res: TheaterSeats) => {
        this.theaterUI = res;
      }
    })
  }

  saveSelectedSeats() {
    if (this.username.length < 1) return;
    const selectedSeats = Array.from(document.querySelectorAll('.selected'));
    const seats: SeatData[] = [];
    selectedSeats.forEach((sel) => {
      const data = sel.getAttribute('id')?.split('-');
      if (data && isValidSection(data[0])) {
        seats.push({
          section: data[0],
          row: +data[1],
          seat: +data[2],
        })
      }
    })
    this.apiService.setSeats$(this.theaterUI, seats, this.username).subscribe(() => {
      this.updateTheater()
    })
  }

  resetTheather() {
    this.apiService.resetTheater$().subscribe(() => {
      this.theaterUI = cloneDeep(DEFAULT_THEATER);
    })
  }

  // bookSeat({ section, row, seat }) {
  //   this.apiService.setSeat$()
  // }
}
