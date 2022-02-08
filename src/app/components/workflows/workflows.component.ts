import { Component, OnInit, TemplateRef } from '@angular/core';
import {WorkflowsService} from '../../services/workflows.service';
import {Workflow} from './workflow';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl,FormGroup} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  public workflows = [] as any;
  modalRef?: BsModalRef;
  formdata:any;

  
  constructor(private service : WorkflowsService , private modalService : BsModalService, private router: Router) { }

  ngOnInit(): void {
    this.getList();
    this.formdata = new FormGroup({
      name: new FormControl(),
      status1: new FormControl(),
      status2: new FormControl(),
      status3: new FormControl()

  });

  }

  getList(){
    this.service.getAll().subscribe(response => this.workflows = response); 
  }


  handleViewImages(id:number){
    const navigationExtras: NavigationExtras = {state: {workflow_id: id}};
    this.router.navigate(['images'], navigationExtras);

  }

  handleViewStatuses(id:number){
    const navigationExtras: NavigationExtras = {state: {workflow_id: id}};
    this.router.navigate(['statuses'], navigationExtras);
    
  }

  handleDeleteWorkflow(id:number){
    this.service.delete(id).subscribe(response => this.getList());

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  

  onClickSubmit(data:any) {
    this.service.add(data.name, data.status1, data.status2, data.status3)
    .subscribe(response => this.getList());
    this.modalRef?.hide();

  }

}
