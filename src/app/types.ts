export type TheaterSeats = {
  platea: Array<string[]>;
  palchi: Array<string[]>;
}

export type SeatData = {
  section: SeatSection;
  row: number;
  seat: number;
}

export enum SeatSection {
  PLATEA = 'platea',
  PALCHI = 'palchi',
}
