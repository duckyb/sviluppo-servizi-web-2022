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

  /** KVaaS endpoint */
  private apiBaseUrl = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

  /** key used in all theater requests */
  private theaterID = '';

  /** Subscribable list of theater IDs */
  public theaterList = new BehaviorSubject<string[]>([]);

  /** The key where we store the list of theaters */
  private theaterListID = '4bbb426d';

  /**
   * Set the theater's key which will be used for all of the theater requests
   */
  setTheaterID(id) {
    this.theaterID = id;
  }

  /**
   * Resets the theater to it's default value
   */
  resetTheater$() {
    return this.http.post(`${this.apiBaseUrl}set?key=${this.theaterID}`, DEFAULT_THEATER)
  }

  /**
   * Returns the parsed data of the theater
   */
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

  /**
   * Facilitates updating the existing data of a theater
   * 
   * @param theater the starting state of the theater
   * @param seats the seats to add
   * @param name the username to use for the booking
   */
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

  /**
   * Get the list of all of our theaters
   */
  getTheaters$(): Observable<string[]> {
    return this.http
      .get<string>(`${this.apiBaseUrl}get?key=${this.theaterListID}`)
      .pipe(map((res: string) => {
        const theaters = JSON.parse(res);
        this.theaterList.next(theaters);
        return theaters;
      }))
  }

  /**
   * Create a new key storage
   */
  private createKey$(): Observable<string> {
    return this.http.get<string>(`${this.apiBaseUrl}new?secret=ssw2022`)
  }

  /**
   * Creates a new theater and adds it to our list
   */
  private addTheater$(key:string) {
    // never add a key to remote without also adding it locally
    const tl = this.theaterList.getValue();
    this.theaterList.next([...tl, key])
    // update the backend
    return this.http
      .post(
        `${this.apiBaseUrl}set?key=${this.theaterListID}`,
        this.theaterList.getValue()
      )
  }

  /**
   * Removes a theater from our list
   */
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

  /**
   * Creates a new theater, emits the new
   * theaterID on success.
   */
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
