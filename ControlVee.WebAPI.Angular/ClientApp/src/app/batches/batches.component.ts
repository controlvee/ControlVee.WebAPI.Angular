import { Injectable } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { pipe, timer } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Batch } from '../batch';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: []
})

@Injectable()
export class BatchesComponent implements OnInit, AfterViewInit {
  public batches$: BehaviorSubject<Batch[]> = new BehaviorSubject<Batch[]>([]);

  constructor(private service: BatchService) {
    

  }

  ngOnInit(): void {
    var updateFrequency = 5000;

    timer(0, updateFrequency).subscribe(x => {
      //this.service.getBatches().subscribe(res => this.batches$.next(res));

      //console.log("from inside batches.component");

    });
    }

  ngAfterViewInit(): void {

   
  }
}
