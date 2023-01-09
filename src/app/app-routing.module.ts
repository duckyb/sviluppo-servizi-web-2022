import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionLayoutComponent } from './selection-layout/selection-layout.component';
import { TheaterLayoutComponent } from './theater-layout/theater-layout.component';

const routes: Routes = [
  { path: '', component: SelectionLayoutComponent },
  { path: ':id', component: TheaterLayoutComponent },
  { path: '**', component: SelectionLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
