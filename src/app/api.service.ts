import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SeatData, SeatSection, TheaterSeats } from './types';

export function isValidSection(str: string): str is SeatSection {
  return (
    str === SeatSection.PLATEA
    || str === SeatSection.PALCHI
  );
}

/**
 * Data for the default (empty) theater
 */
export const DEFAULT_THEATER: TheaterSeats = {
  platea: new Array(5).fill(new Array(10).fill('')),
  palchi: new Array(4).fill(new Array(6).fill('')),
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

  private theaterID = '79b39d2c';

  resetTheater$() {
    console.log({DEFAULT_THEATER})
    return this.http.post(`${this.apiBaseUrl}set?key=${this.theaterID}`, DEFAULT_THEATER)
  }

  getSeats$(): Observable<TheaterSeats> {
    return this.http
      .get<string>(`${this.apiBaseUrl}get?key=${this.theaterID}`)
      .pipe(map((res: string) => JSON.parse(res)))
  }

  updateTheater$(newTheater: TheaterSeats) {
    return this.http
      .post(
        `${this.apiBaseUrl}set?key=${this.theaterID}`,
        newTheater
      )
  }

  setSeats$(
    theater: TheaterSeats,
    seats: SeatData[],
    name: string,
  ) {
    const newTheater = {...theater};
    seats.forEach(s => {
      newTheater[s.section][s.row][s.seat] = name;
    })
    return this.updateTheater$(theater)
  }
}
