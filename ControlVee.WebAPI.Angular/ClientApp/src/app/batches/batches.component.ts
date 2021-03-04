import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Batch } from '../batch';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})

@Injectable()
export class BatchesComponent implements OnInit {
  batches$: BehaviorSubject<Batch[]>;

  constructor(private service: BatchService) { }

  ngOnInit(): void {

    var timeThis = timer(0, 5000);

    timeThis.subscribe((elapsed) => {
      this.batches$.next(this.service.getBatches());
    });
  }

}
