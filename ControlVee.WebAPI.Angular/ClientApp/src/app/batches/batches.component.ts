import { Injectable } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { pipe, timer } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Batch } from '../batch';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})

@Injectable()
export class BatchesComponent implements OnInit, AfterViewInit {
  elapsed$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  batches$: BehaviorSubject<Batch[]> = new BehaviorSubject<Batch[]>([]);
  typeA: Batch[];
  typeA$: BehaviorSubject<Batch[]>;
  typeB: Batch[];
  typeB$: BehaviorSubject<Batch[]>;
  typeC: Batch[];
  typeC$: BehaviorSubject<Batch[]>;
  typeD: Batch[];
  typeD$: BehaviorSubject<Batch[]>;
  typeE: Batch[];
  typeE$: BehaviorSubject<Batch[]>;
  typeF: Batch[];
  typeF$: BehaviorSubject<Batch[]>;
  typeG: Batch[];
  typeG$: BehaviorSubject<Batch[]>;
  typeH: Batch[];
  typeH$: BehaviorSubject<Batch[]>;
 

  constructor(private service: BatchService) {
    this.typeA$ = new BehaviorSubject<Batch[]>([]);
    this.typeB$ = new BehaviorSubject<Batch[]>([]);
    this.typeC$ = new BehaviorSubject<Batch[]>([]);
    this.typeD$ = new BehaviorSubject<Batch[]>([]);
    this.typeE$ = new BehaviorSubject<Batch[]>([]);
    this.typeF$ = new BehaviorSubject<Batch[]>([]);
    this.typeG$ = new BehaviorSubject<Batch[]>([]);
    this.typeH$ = new BehaviorSubject<Batch[]>([]);
  }

  ngOnInit(): void {
    var batches = this.service.getBatches();
    this.batches$.next(batches);
    this.sortByBatchType(true);
    }

  ngAfterViewInit(): void {
    timer(500, 500).subscribe(x => {

      this.progress$.next(x);

      this.sortByBatchType(true);
    });

    timer(1000, 60000).subscribe(x => {

      var batches = this.service.getBatches();

      this.batches$.next(batches);
      this.sortByBatchType(false);
    });
  }

  // TODO: Split responsibilites.
  sortByBatchType(timeElapsedInfo): void {
    console.log("in sort function");

    this.typeA = [] as Batch[];
    this.typeB = [] as Batch[];
    this.typeC = [] as Batch[];
    this.typeD = [] as Batch[];
    this.typeE = [] as Batch[];
    this.typeF = [] as Batch[];
    this.typeG = [] as Batch[];
    this.typeH = [] as Batch[];

    this.batches$.getValue().forEach(pipe(

      (b: Batch) => {

        if (timeElapsedInfo) {
          console.log('getting time elap');
          // Calculate elapsed time.
          var startTime = Date.parse(b["started"]);
          var elapsedMiliseconds = new Date().valueOf() - startTime.valueOf();
          var elapsedSeconds = elapsedMiliseconds / 1000;
          b["elapsed"] = (Math.round(elapsedSeconds)).toLocaleString();

         

          return;
        }

        var dateFormatted = new Date(b["started"]).toLocaleString();
        console.log(dateFormatted);
        b["started"] = dateFormatted.valueOf();

        switch (b["nameOf"]) {


          case "Classic Glazed": {

            this.typeA.push(b);

            console.log(b["id"] + "_A")
            break;
          }
          case "Strawberry PopTart": {

            this.typeB.push(b);

            console.log(b["id"] + "_B")
            break;
          }
          case "Capn Crunched": {

            this.typeC.push(b);

            console.log(b["id"] + "_C")
            break;
          }
          case "Shred Tha Gnar": {

            this.typeD.push(b);

            console.log(b["id"] + "_D")
            break;
          }
          case "Chocolatte": {

            this.typeE.push(b);

            console.log(b["id"] + "_D")
            break;
          }
          case "M&M 'manem": {

            this.typeF.push(b);

            console.log(b["id"] + "_D")
            break;
          }
          case "Sugar High": {

            this.typeG.push(b);

            console.log(b["id"] + "_D")
            break;
          }
          default: {
            console.log(b["id"] + "_UNK")
            break;
          }
        }

        this.typeA$.next(this.typeA);
        this.typeB$.next(this.typeB);
        this.typeC$.next(this.typeC);
        this.typeD$.next(this.typeD);
        this.typeE$.next(this.typeE);
        this.typeF$.next(this.typeF);
        this.typeG$.next(this.typeG);
      }));
  }
}
