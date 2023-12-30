import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-error.component.html',
  styleUrl: './print-error.component.css'
})
export class PrintErrorComponent {
  @Input() control: any;
  @Input() controlName: any

  shouldDisplayErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }
  // @Input() control: any;
  // @Input() errorType: string = 'default';

  // get errorMessage(): string {
  //   if (this.errorType === 'required') {
  //     return 'This field is required.';
  //   } else if (this.errorType === 'minlength') {
  //     return `Minimum length is ${this.control.errors.minlength.requiredLength}.`;
  //   } else {
  //     return 'Invalid value.';
  //   }
  // }

  // shouldDisplayError(): boolean {
  //   return this.control && this.control.errors && this.control.touched;
  // }
}
