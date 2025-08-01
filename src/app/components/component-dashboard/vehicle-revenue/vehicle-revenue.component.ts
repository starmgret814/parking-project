import { Component, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';

interface month {
  value: string;
  viewValue: string;
}

export interface vehicleRevenueChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-vehicle-revenue',
  imports: [
    MaterialModule,
    TablerIconsModule,
    NgApexchartsModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-revenue.component.html',
})
export class AppVehicleRevenueComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public vehicleRevenueChart!: Partial<vehicleRevenueChart> | any;

  constructor() {
    // sales overview chart
    this.vehicleRevenueChart = {
      series: [
        {
          name: 'Ganancias del día',
          data: [355, 390, 300, 350],
          color: 'rgba(28, 58, 138, 1)',
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: false },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: ['Moto', 'Auto/Camioneta', 'Camión', 'Bus'],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
  }
}
