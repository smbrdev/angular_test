import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Status} from '../components/statuses/status';
import {HttpClient, HttpParams} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  private api_url = "http://localhost:8000/api/statuses";

  constructor(private http:HttpClient) { }


  getStatuses(id:number) : Observable<Status[]> {
      return this.http.get<Status[]>(this.api_url+'/'+id);
  }

  update(title:string,id:number) : Observable<Status> {
      const body = { 
      title : title
     };

    return this.http.put<Status>(this.api_url+'/'+id,body);
  }




}
