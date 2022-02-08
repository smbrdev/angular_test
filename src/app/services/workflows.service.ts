import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Workflow} from '../components/workflows/workflow';


@Injectable({
  providedIn: 'root'
})

export class WorkflowsService {

  private api_url = "http://localhost:8000/api/workflows";

  constructor(private http:HttpClient) { }

  getAll() : Observable<Workflow[]> {
      return this.http.get<Workflow[]>(this.api_url);
  }

  add(namer:string, status1r:string, status2r:string, status3r:string) : Observable<Workflow> {
    const body = { 
      name : namer,
      status1 : status1r,
      status2 : status2r,
      status3 : status3r

     };

    return this.http.post<Workflow>(this.api_url,body);

  }

  delete(id:number): Observable<boolean>{
    return this.http.delete<boolean>(this.api_url+'/'+id);  

  }

}
