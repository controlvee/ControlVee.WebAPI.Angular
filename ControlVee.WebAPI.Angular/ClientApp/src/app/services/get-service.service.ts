import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Batch } from '../batch';
import { BatchesComponent } from '../batches/batches.component';
import { ScatterComponent } from '../scatter/scatter.component';
import { Observable, pipe, timer } from 'rxjs';
import { map } from 'd3-array';

@Injectable()
export class BatchService {
  inventoryUrl = "http://localhost:55679/Inventory";
  constructor(private http: HttpClient) {

    
  }

  getBatches(): Observable<Batch[]> {
    var url = this.inventoryUrl + "/getBatches";
    console.log("from inside service.component");
    return this.http.get<Batch[]>(url);
  };
}

