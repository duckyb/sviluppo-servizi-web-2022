import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TheaterComponent } from './theater/theater.component';
import { TheaterLayoutComponent } from './theater-layout/theater-layout.component';
import { SelectionLayoutComponent } from './selection-layout/selection-layout.component';
import { TheaterActionsComponent } from './theater-actions/theater-actions.component';
import { ViewNameComponent } from './view-name/view-name.component';
import { HeaderComponent } from './header/header.component';
import { TheaterSelectorComponent } from './theater-selector/theater-selector.component';
import { ButtonComponent } from './button/button.component';
import { UsernameInputComponent } from './username-input/username-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TheaterComponent,
    TheaterLayoutComponent,
    SelectionLayoutComponent,
    TheaterActionsComponent,
    ViewNameComponent,
    HeaderComponent,
    TheaterSelectorComponent,
    ButtonComponent,
    UsernameInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
