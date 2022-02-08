import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Image} from '../components/images/image';
import {Status} from '../components/statuses/status';

import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private api_url = "http://localhost:8000/api/images";

  constructor(private http:HttpClient) { }

  getImages(id:number) : Observable<Image[]> {
      return this.http.get<Image[]>(this.api_url+'/'+id);
  }

  getStatusesForImages(id:number) : Observable<Status[]>{
    return this.http.get<Status[]>("http://localhost:8000/api/statuses"+'/'+id);
  }

  update(title:string,status_id:number,id:number) : Observable<Image> {
      const body = { 
      status_id : status_id,
      title : title
     };

    return this.http.put<Image>(this.api_url+'/'+id,body);
  }

  add(data:any,id:number) : Observable<Image> {

    const postData = new FormData();
    postData.append('title', data.title);
    postData.append('image', data.image);

    return this.http.post<Image>(this.api_url+'/'+id,postData);
  }

   delete(id:number): Observable<boolean>{
    return this.http.delete<boolean>(this.api_url+'/'+id);  

  }


}
