import { Component } from '@angular/core';
import { ChildOutputComponent } from "./child-output-component/child-output-component";

@Component({
  selector: 'app-output-component',
  imports: [ChildOutputComponent],
  templateUrl: './output-component.html',
  styleUrl: './output-component.scss'
})
export class OutputComponent {

  value = 'Click the button to throw an output event. ';
  counter = 0;

  recieveOutput(event: string) {
    this.value = event;
    this.counter++;
  }

}
