import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pipe-examples',
  imports: [CommonModule],
  templateUrl: './pipe-examples.html',
  styleUrl: './pipe-examples.scss'
})
export class PipeExamples {

    name = 'John Doe';
  price = 1234.567;
  today = new Date();
  items = [{ id: 1, label: 'One' }, { id: 2, label: 'Two' }];

}
