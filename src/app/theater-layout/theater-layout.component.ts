import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, DEFAULT_THEATER, isValidSection } from '../api.service';
import { cloneObject } from '../helpers';
import { TheaterSeats, SeatData } from '../types';

@Component({
  selector: 'app-theater-layout',
  templateUrl: './theater-layout.component.html',
  styleUrls: ['./theater-layout.component.scss']
})
export class TheaterLayoutComponent {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.apiService = apiService;
    this.route = route;
  }

  // two-way binding
  public username = '';

  public theaterUI = cloneObject(DEFAULT_THEATER);

  ngOnInit(): void {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.username = savedUser;
    }
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.apiService.setTheaterID(id);
      this.updateTheater();
    })
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
      this.theaterUI = cloneObject(DEFAULT_THEATER);
    })
  }
}
