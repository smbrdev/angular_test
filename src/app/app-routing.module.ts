import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkflowsComponent} from './components/workflows/workflows.component';
import {StatusesComponent} from './components/statuses/statuses.component';
import {ImagesComponent} from './components/images/images.component';



const routes: Routes = [

{
  path: "" , component : WorkflowsComponent
},

{
  path: "statuses" , component : StatusesComponent
},

{
  path: "images" , component : ImagesComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
