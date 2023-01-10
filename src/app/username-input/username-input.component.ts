import { Input, Output } from '@angular/core';
import { EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'username-input',
  template: `
    <div class="username-input card">
      <div class="username-input__form">
        <label for="username">Name</label>
        <input
          class="username-input__input"
          type="text"
          name="username"
          id="username"
          (input)="this.onInput($event.target)"
          [value]="username">
      </div>
    </div>
  `,
  styleUrls: ['./username-input.component.scss']
})
export class UsernameInputComponent {
  @Input() username = '';

  @Output() onChange = new EventEmitter();

  onInput(target) {
    const value = (target as HTMLInputElement).value;
    if (value) {
      this.onChange.emit(value)
    }
  }
}
