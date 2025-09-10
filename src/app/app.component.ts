import { Component } from '@angular/core';
import { SimpleComponent } from "./components/simple-component/simple-component";
import { TypeScriptComponent } from "./components/type-script-component/type-script-component";
import { ContainerComponent } from "./components/container-component/container-component";
import { ForLoopComponent } from "./components/for-loop-component/for-loop-component";
import { IfConditionalComponent } from "./components/if-conditional-component/if-conditional-component";
import { InputComponent } from "./components/input-component/input-component";
import { OutputComponent } from "./components/output-component/output-component";
import { CommonModule } from '@angular/common';
import { BasicJs } from "./components/basic-js/basic-js";

@Component({
  selector: 'app-root',
  imports: [
    SimpleComponent,
    TypeScriptComponent,
    CommonModule,
    ContainerComponent,
    ForLoopComponent,
    IfConditionalComponent,
    InputComponent,
    OutputComponent,
    BasicJs
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  selector = 'Empty';
  items: string[] = [
    "Empty",
    "Basic JS",
    "Simple Component",
    "Using tipescript in html",
    "Component inside component",
    "Component with input",
    "Component with output",
    "For loop",
    "If conditional",
  ];
}
