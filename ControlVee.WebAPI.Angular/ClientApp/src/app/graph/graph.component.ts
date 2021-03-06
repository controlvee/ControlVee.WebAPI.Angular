import { Injectable } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { pipe, timer } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Batch } from '../batch';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: []
})

@Injectable()
export class GraphComponent {

  constructor() { }


}
