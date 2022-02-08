import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl,FormGroup} from '@angular/forms';
import {Status} from './status';

import {StatusesService} from '../../services/statuses.service';





@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  public statuses = [] as any;
  public modalRef?: BsModalRef;
  public formdata:any;
  public workflow_id : any;
  public selectedStatus = <Status>{};


  constructor(private service : StatusesService , private modalService : BsModalService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {workflow_id: number};
    this.workflow_id = state['workflow_id']; 
    
  }

  ngOnInit(): void {
    this.getList(this.workflow_id);
     this.formdata = new FormGroup({
      title: new FormControl(),

    });

  }

   getList(id:number){
    this.service.getStatuses(id).subscribe(response => this.statuses = response); 
  }


  openModal(template: TemplateRef<any>, status?:Status) {
    if(status){
      this.selectedStatus = status;
      this.formdata.controls.title.setValue(status.title);

    }
    this.modalRef = this.modalService.show(template);
  }


  onClickSubmit(data:any) {
    this.service.update(data.title, this.selectedStatus.id)
    .subscribe(response => this.getList(this.workflow_id));
    this.modalRef?.hide();
    this.formdata.controls.title.reset();


  }

}
