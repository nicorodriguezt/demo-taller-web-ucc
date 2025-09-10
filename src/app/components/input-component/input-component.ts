import { Component } from '@angular/core';
import { ChildInputComponent } from './child-input-component/child-input-component';

@Component({
  selector: 'app-input-component',
  imports: [ChildInputComponent],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss'
})
export class InputComponent {

}
