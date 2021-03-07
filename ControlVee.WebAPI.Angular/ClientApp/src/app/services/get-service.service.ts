import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Batch } from '../batch';
import { Observable } from 'rxjs';

@Injectable()
export class BatchService {
  inventoryUrl = "http://localhost:55679/Inventory";
  getMethod = "/getBatches";

  constructor(private http: HttpClient) { }

  getBatches(): Observable<any>{

    return this.http.get<Batch[]>(this.inventoryUrl + this.getMethod).pipe(data => { return data });
  }

}

