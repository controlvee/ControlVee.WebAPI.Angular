import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { pipe, timer } from 'rxjs';
import { Batch } from '../batch';
import { BatchesComponent } from '../batches/batches.component';
import { BatchService } from '../services/get-service.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {

  private svg;
  // Perhaps time elapsed since creation vs total left in inventory?
  // Dynamic, random dataset.

  numDataPoints: number = 6;
  xRange: number = Math.random() * 1000;
  yRange: number = Math.random() * 1000;

  batches = [] as Batch[];

  constructor(private service: BatchService) {

  }

  ngOnInit(): void {
    var timed = timer(0, 2000);

    timed.subscribe(() => {

      var margin = 200;
      var width = parseInt(d3.select("figure.mat-figure").style("width").replace("px", ""));

      var height = parseInt(d3.select("figure.mat-figure").style("height").replace("px", ""));

      // Async.
      this.service.getBatches().subscribe(pipe((b: Batch[]) => { this.batches = b }));
      var dataset = new Array();


      for (var i = 0; i < this.batches.length; i++) {

        var startTime = Date.parse(this.batches[i]["started"]);
        var elapsedMiliseconds = new Date().valueOf() - startTime.valueOf();
        var elapsedSeconds = (elapsedMiliseconds / 2000).toFixed(0);
        this.batches[i]["elapsed"] = elapsedSeconds;


        var newNumber2 = this.batches[i]["elapsed"];
        var newNumber1 = this.batches[i]["total"];
        dataset.push([newNumber1, newNumber2]);

        d3.select("svg").remove();
        this.createSvg(width, height, margin);
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
  }

  private drawPlot(dataset: Array<number>, width, height): void {

    var padding = 60;

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) { return d[0]; })])
      .range([padding, width - padding * 4]);

    var yScale = d3.scaleLinear()
      .domain([d3.min(dataset, function (d) { return d[1]; }), d3.max(dataset, function (d) { return d[1]; })])
      .range([height - padding, padding]);


    this.svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .on('mouseover', function () {

        console.log(this.childNodes);
      })
      .attr("cx", function (d) {
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("r", function (d) {
        return d[0] * 2;
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

    // Y-Axis.
    var yAxis = d3.axisLeft(yScale)
      .ticks(4);

    // Create.
    this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

  }

}
