import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
  ApexGrid,
  ApexMarkers,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  VehicleService,
  IngresoPorTipoVehiculo,
} from 'src/app/services/vehicle.service';

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
  markers: ApexMarkers;
}

@Component({
  selector: 'app-vehicle-revenue',
  standalone: true,
  imports: [
    MaterialModule,
    TablerIconsModule,
    NgApexchartsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-revenue.component.html',
})
export class AppVehicleRevenueComponent implements OnInit {
  tiposVehiculo: string[] = [];
  ingresosData: number[] = [];

  vehicleRevenueChart!: vehicleRevenueChart;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getIngresosPorTipoVehiculo().subscribe(
      (ingresos: IngresoPorTipoVehiculo[]) => {
        this.tiposVehiculo = ingresos.map(
          (i) => i.tipo_vehiculo?.nombre ?? 'Sin nombre'
        );
        this.ingresosData = ingresos.map((i) =>
          isNaN(Number(i.total_recaudado)) ? 0 : Number(i.total_recaudado)
        );

        this.vehicleRevenueChart = {
          series: [
            {
              name: 'Ganancias del día',
              data: this.ingresosData,
              color: 'rgba(168, 44, 58, 1)',
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
          },
          dataLabels: { enabled: false },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '35%',
              borderRadius: 4,
            },
          },
          xaxis: {
            categories: this.tiposVehiculo,
          },
          yaxis: {
            min: 0,
            max: Math.ceil(Math.max(...this.ingresosData) / 10) * 10,
            tickAmount: 5,
          },
          fill: {
            opacity: 1,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          tooltip: {
            enabled: true,
          },
          legend: {
            show: false,
          },
          grid: {
            borderColor: '#f1f1f1',
          },
          markers: {
            size: 0,
          },
        };
      },
      (error) => {
        console.error('Error al obtener ingresos:', error);
      }
    );
  }
}
