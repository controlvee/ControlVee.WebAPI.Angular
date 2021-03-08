import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, pipe, timer } from 'rxjs';
import { Batch } from '../batch';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})

@Injectable()
export class ScatterComponent implements OnInit {

  private svg;
  // Perhaps time elapsed since creation vs total left in inventory?
  // Dynamic, random dataset.

  numDataPoints: number = 6;
  xRange: number = Math.random() * 1000;
  yRange: number = Math.random() * 1000;
  batches$ = new BehaviorSubject <Batch[]>([]);

  constructor(private service: BatchService) {

    
  }

  ngOnInit(): void {

    

    var updateFrequency = 10000;
    var timed = timer(0, updateFrequency);

    timed.subscribe((x) => {


      var margin = 200;
      var width = 500;
      var height = 500;
      var dataSetLength;

      d3.select("svg").remove();
      this.createSvg(width, height, margin);

      this.service.getBatches().subscribe(res => {
        this.batches$.next(res);
      });


      dataSetLength = this.batches$.value.length;
      console.log("from inside scatter.component");
      console.log(dataSetLength + " " + "length of dataset");
      // Async.
      // Refactor.
      var dataset = new Array();
      
      for (var i = 0; i < dataSetLength; i++) {

        var newNumber1 = this.batches$.value[i]["total"];
        var newNumber2 = this.batches$.value[i]["totalSold"];
        console.log(newNumber1 + " " + "total");
        console.log(newNumber2 + " " + "totalSold");

        dataset.push([newNumber1, newNumber2]);

        
        
        this.drawPlot(dataset, width, height);
      }
     
      

    });
   

  }

  private createSvg(width, height, margin): void {
   

    this.svg = d3.select("figure#scatterPlot")
      .append("svg")
      .attr("width", width + (margin * 2))
      .attr("height", height + (margin * 2))
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

    console.log("created SVG");
  }

  private drawPlot(dataset: Array<number>, width, height): void {

    var padding = 60;

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) { return d[0]; })])
      .range([padding, width - padding * 4]);

    // Y-scale inverts on it's own?
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) { return d[1] * 1.5; })])
      .range([height - padding, padding]);


    this.svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .on('mouseover', function (event) {

        console.log(event);
      })
      .attr("cx", function (d) {
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("r", function (d) {
        return d[0];
      });

    this.svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return "[" + d[0] + "," + d[1] + "]";
      })
      .attr("class", "textPlots")
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .style("fill", "white")
      .attr("id", function (d) {
        return d[0] + "_" + d[1];
      })
      .attr("x", function (d) {
        return xScale(d[0]);
      })
      .attr("y", function (d) {
        return yScale(d[1]);
      });




    // X-Axis.
    var xAxis = d3.axisBottom(xScale)
      .ticks(5);

    // Create.
    this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis);

    console.log("appended x-axis");

    // Y-Axis.
    var yAxis = d3.axisLeft(yScale)
      .ticks(4);

    // Create.
    this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    console.log("appended y-axis");
  }

}
