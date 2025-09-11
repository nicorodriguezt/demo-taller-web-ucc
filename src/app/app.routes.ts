import { Routes } from '@angular/router';
import { SimpleComponent } from './components/simple-component/simple-component';
import { BasicJs } from './components/basic-js/basic-js';
import { TypeScriptComponent } from './components/type-script-component/type-script-component';
import { ContainerComponent } from './components/container-component/container-component';
import { ForLoopComponent } from './components/for-loop-component/for-loop-component';
import { IfConditionalComponent } from './components/if-conditional-component/if-conditional-component';
import { InputComponent } from './components/input-component/input-component';
import { OutputComponent } from './components/output-component/output-component';
import { Empty } from './components/empty/empty';

/*
  Define the application routes
  Each route maps a URL path to a component
  You should have a route with ** path at the end to catch all undefined routes
  Check app html to understand how to use this routes
*/ 
export const routes: Routes = [
  { path: '', component: Empty, pathMatch: 'full' },
  { path: 'basic-js', component: BasicJs },
  { path: 'simple-component', component: SimpleComponent },
  { path: 'using-typescript-in-html', component: TypeScriptComponent },
  { path: 'component-inside-component', component: ContainerComponent },
  { path: 'for-loop', component: ForLoopComponent },
  { path: 'if-conditional', component: IfConditionalComponent },
  { path: 'component-with-input', component: InputComponent },
  { path: 'component-with-output', component: OutputComponent },
  { path: '**', redirectTo: '' },
];
