import { Component, ViewChild, OnInit } from '@angular/core';
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

import { IngresoPorTipoVehiculo } from 'src/app/services/vehicle.service';

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
export class AppVehicleRevenueComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  tiposVehiculo: string[] = [];
  ingresosData: number[] = [];

  public vehicleRevenueChart!: Partial<vehicleRevenueChart> | any;

  ngOnInit() {
    const ingresos = [
      { total_recaudado: '100', tipo_vehiculo: { nombre: 'Auto' } },
      { total_recaudado: '200', tipo_vehiculo: { nombre: 'Moto' } },
      { total_recaudado: '150', tipo_vehiculo: { nombre: 'Bus' } },
    ];

    this.tiposVehiculo = ingresos.map(
      (i) => i.tipo_vehiculo?.nombre ?? 'Sin nombre'
    );
    this.ingresosData = ingresos.map((i) => Number(i.total_recaudado) || 0);

    this.ingresosData = ingresos.map((i) =>
      isNaN(Number(i?.total_recaudado)) ? 0 : Number(i.total_recaudado)
    );

    this.vehicleRevenueChart = {
      series: [
        {
          name: 'Ganancias del día',
          data: this.ingresosData,
          color: 'rgba(168, 44, 58, 1)',
        },
      ],
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: { lines: { show: false } },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        width: '100%',
        offsetX: 15,
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
        categories: this.tiposVehiculo,
        labels: {
          trim: false,
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
            fontSize: '11.9px',
          },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 250,
        tickAmount: 5,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
            fontSize: '12px',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: false,
        theme: 'light',
        followCursor: false,
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: { bar: { borderRadius: 3 } },
          },
        },
      ],
    };
  }
}
