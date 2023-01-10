import { Component, Input } from '@angular/core';

@Component({
  selector: 'view-name',
  template: `
    <div class="view-name">
      <section class="view-name__wrapper">
        <h1 class="view-name__name">
          {{ name || 'Posto libero' }}
        </h1>
      </section>
    </div>
  `,
  styleUrls: ['./view-name.component.scss']
})
export class ViewNameComponent {
  @Input() name = '';
}
