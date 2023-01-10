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

  /**
   * Fetch the initial view of the theater
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;
      // set the theater key based on the page URL
      this.apiService.setTheaterID(id);
      // initialize the view
      this.updateTheater();
    })
  }

  onNameChange(newName: string) {
    console.log(newName)
    this.username = newName;
  }

  /**
   * Write data to the theater
   */
  updateTheater() {
    this.apiService.getSeats$().subscribe({
      next: (res: TheaterSeats) => {
        if (!res) {
          this.resetTheater()
        } else {
          this.theaterUI = res;
        }
      }
    })
  }

  /**
   * Find all selected seats, and save the username in each seat's assigned string
   */
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

  /**
   * Empty out all of the strings from a theater, resetting the view
   */
  resetTheater() {
    this.apiService.resetTheater$().subscribe(() => {
      this.theaterUI = cloneObject(DEFAULT_THEATER);
    })
  }
}
