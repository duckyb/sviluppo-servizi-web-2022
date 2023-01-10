import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
        <a routerLink="/">
            <div class="header-button">
                Home
            </div>
        </a>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
