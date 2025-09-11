import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  selector = 'Empty';
items = [
  { label: "Empty", route: "" },
  { label: "Basic JS", route: "/basic-js" },
  { label: "Simple Component", route: "/simple-component" },
  { label: "Using typescript in html", route: "/using-typescript-in-html" },
  { label: "Component inside component", route: "/component-inside-component" },
  { label: "Component with input", route: "/component-with-input" },
  { label: "Component with output", route: "/component-with-output" },
  { label: "For loop", route: "/for-loop" },
  { label: "If conditional", route: "/if-conditional" }
];
} 
