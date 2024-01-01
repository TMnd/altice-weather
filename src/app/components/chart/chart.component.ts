import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts'
import { DataTableService } from '../data-table/data-table.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableRow } from '../data-table/data-table-row.interface';
import { ChartInterface } from './chart.interface';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule, 
    NgxEchartsDirective
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  @Input("dataSource") data!: ChartInterface;

  constructor () {}

  chartOption: EChartsOption = {}

  ngOnInit(): void {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.data?.xAxis,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.data?.yAxis,
          type: 'line',
        },
      ],
    };

    console.log(this.chartOption);
  }
}
