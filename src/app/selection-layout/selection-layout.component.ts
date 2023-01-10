import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-selection-layout',
  templateUrl: './selection-layout.component.html',
  styleUrls: ['./selection-layout.component.scss']
})
export class SelectionLayoutComponent implements OnInit {
  constructor(
    private apiService: ApiService,
  ) {
    this.apiService = apiService;
  }

  public theaters: string[];

  ngOnInit(): void {
    this.apiService.getTheaters$().subscribe(() => {
        this.apiService.theaterList.subscribe(d => {
          console.log('new theater list', d)
          this.theaters = d;
        })
      }
    )
  }

  onCreateTheater() {
    this.apiService
      .createTheater$()
      .subscribe()
  }

  onDeleteTheater(key: string) {
    console.log('delete', key)
    this.apiService
      .removeTheater$(key)
      .subscribe()
  }
}
