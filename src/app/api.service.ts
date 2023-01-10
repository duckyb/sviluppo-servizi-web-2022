import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, Observable, of } from 'rxjs';
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

  public theaterList = new BehaviorSubject<string[]>([]);

  private theaterListID = '4bbb426d';

  setTheaterID(id) {
    this.theaterID = id;
  }

  resetTheater$() {
    return this.http.post(`${this.apiBaseUrl}set?key=${this.theaterID}`, DEFAULT_THEATER)
  }

  getSeats$(): Observable<TheaterSeats> {
    return this.http
      .get<string>(`${this.apiBaseUrl}get?key=${this.theaterID}`)
      .pipe(map((res: string) => JSON.parse(res)))
  }

  private updateTheater$(newTheater: TheaterSeats) {
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

  getTheaters$(): Observable<string[]> {
    return this.http
      .get<string>(`${this.apiBaseUrl}get?key=${this.theaterListID}`)
      .pipe(map((res: string) => {
        const theaters = JSON.parse(res);
        this.theaterList.next(theaters);
        return theaters;
      }))
  }

  private createKey$(): Observable<string> {
    return this.http.get<string>(`${this.apiBaseUrl}new?secret=ssw2022`)
  }

  private addTheater$(key:string) {
    // never add a key to remote without also adding it locally
    const tl = this.theaterList.getValue();
    this.theaterList.next([...tl, key])
    // initialize the theater

    // update the backend
    return this.http
      .post(
        `${this.apiBaseUrl}set?key=${this.theaterListID}`,
        this.theaterList.getValue()
      )
  }

  removeTheater$(key:string) {
    const theaters = this.theaterList.getValue();
    const index = theaters.indexOf(key);
    if (index > -1) {
      theaters.splice(index, 1)
      this.theaterList.next(theaters)
    }
    return this.http
      .post(
        `${this.apiBaseUrl}set?key=${this.theaterListID}`,
        this.theaterList.getValue()
      )
  }

  createTheater$() {
    // create a new key storage (theater)
    return this.createKey$().pipe(
      mergeMap((key:string) => {
        // save the new theater
        return this.addTheater$(key)
          // emit the new key on success
          .pipe(map(() => key))
      })
    )
  }
}
