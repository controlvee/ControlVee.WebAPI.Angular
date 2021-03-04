import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Batch } from '../batch';

@Injectable()
export class BatchService {

  inventoryUrl = "http://localhost:55679/Inventory";
  getMethod = "/getBatches";
  batches = [] as Batch[];

  constructor(private http: HttpClient) { }

  getBatches(): Batch[]{
    
    var response = this.http.get<Batch[]>(this.inventoryUrl + this.getMethod).subscribe(data => { this.batches = data as Batch[] });

    console.log(response);
    return this.batches;
  }
}

