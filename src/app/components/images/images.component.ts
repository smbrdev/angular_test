import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl,FormGroup} from '@angular/forms';
import {Status} from '../statuses/status';
import {Image} from './image';


import {ImagesService} from '../../services/images.service';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public statuses = [] as any;
  public images = [] as any;
  public modalRef?: BsModalRef;
  public createformdata:any;
  public editformdata:any;
  public workflow_id : any;
  public selectedImage = <Image>{};
  imagePreview: any;




  constructor(private service : ImagesService , private modalService : BsModalService, private router: Router) { 
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {workflow_id: number};
      this.workflow_id = state['workflow_id']; 
  }


  ngOnInit(): void {

    this.getImagesList(this.workflow_id);
    this.getStatusesList(this.workflow_id);
     this.createformdata = new FormGroup({
      title: new FormControl(),
      image: new FormControl()

    });

     this.editformdata = new FormGroup({
      title: new FormControl(),
      status_id: new FormControl()
    });
  }


  getImagesList(id:number){
    this.service.getImages(id).subscribe(response => this.images = response); 
  }

  getStatusesList(id:number){
    this.service.getStatusesForImages(id).subscribe(response => this.statuses = response); 
  }

  openModal(template: TemplateRef<any>, image?:Image) {
    if(image){
      this.selectedImage = image;
      this.editformdata.controls.title.setValue(image.title);
      this.editformdata.controls.status_id.setValue(image.status_id);
    }
    
    this.modalRef = this.modalService.show(template);
  }

  onClickSubmitNew() {
    const post = {
    title: this.createformdata.value.title,
    image: this.createformdata.value.image
    };
    this.service.add(post,this.workflow_id)
    .subscribe(response => this.getImagesList(this.workflow_id));
    this.modalRef?.hide();
    this.createformdata.controls.title.reset();
    this.createformdata.controls.image.reset();


  }


  onClickUpdate(data:any) {
    this.service.update(data.title, data.status_id, this.selectedImage.id)
    .subscribe(response => this.getImagesList(this.workflow_id));
    this.modalRef?.hide();
    this.editformdata.controls.title.reset();
    this.editformdata.controls.status_id.reset();

  }
  
  
  handleDeleteImage(id:number){
    this.service.delete(id).subscribe(response => this.getImagesList(this.workflow_id));

  }



onSelect(event: Event) {
const target = event.target as HTMLInputElement;
const file = target.files![0];

this.createformdata.patchValue({image: file});
this.createformdata.get('image').updateValueAndValidity();
const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result?.toString();
};
reader.readAsDataURL(file);
}





}
