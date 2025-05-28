import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { VentasService } from '../../services/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-home',
  imports:[CommonModule,SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;
  @ViewChild('chart1') chart1Ref!: ElementRef;
  chart: Chart | undefined;
  chart1: Chart |undefined;
  datos: any = {};
  datos1: any = {}; // Cambia a objeto, no array

  constructor(private ventaService: VentasService, private toastr: ToastrService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.refresh();
  }

  getVentaPromedioMeses(id: number) {
    this.ventaService.getVentasPromedioPanaderia(id).subscribe((data: any) => {
      this.datos = data;
      this.actualizarGrafico(); // Actualiza el gráfico cuando llegan los datos
    });
  }
  getVentasMes(panaderiaId: number,id: number) {
    this.ventaService.getVentasMes(panaderiaId,id).subscribe((data: any) => {
      this.datos1 = data;
      this.actualizarGrafico(); // Actualiza el gráfico cuando llegan los datos
      //this.actualizarGrafico1();
    });
  }

  refresh() {
    const hoy = new Date();
    const panaderiaId = localStorage.getItem('panaderiaId');
    const mesActual = hoy.getMonth() + 1;
    if (panaderiaId) {
      this.datos = {};
      this.datos1 = {};
      this.getVentaPromedioMeses(parseInt(panaderiaId));
      this.getVentasMes(parseInt(panaderiaId),mesActual);
    }
  }

  actualizarGrafico() {
    const todosLosMeses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const valoresFinales = todosLosMeses.map(mes => this.datos[mes] ?? 0);

    // Destruye el gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: todosLosMeses,
        datasets: [{
          label: 'Valor por mes',
          data: valoresFinales,
          borderColor: 'rgb(17, 0, 255)',
          backgroundColor: 'rgba(118, 54, 245, 0.5)',
          borderSkipped: false,
        }]
      },
      options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },title: {
        display: true,
        text: 'Promedio de ventas por mes'
      }}}
    });
  }
////////////////////////////////////crear otra tabla  con el #chart1/////////////////////

  // actualizarGrafico1() {
  //   const todosLoslabel = [
  //     'sumaCantidad', 'cantidadVentas', 'promedioVentas'
  //   ];

  //   const valoresFinales = todosLoslabel.map(obj => this.datos1[obj]);
  //   console.log(valoresFinales)

  //   // Destruye el gráfico anterior si existe
  //   if (this.chart1) {
  //     this.chart1.destroy();
  //   }

  //   const ctx = this.chart1Ref.nativeElement.getContext('2d');
  //   this.chart1 = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Ingresos Totales','# de Ventas','Promedio de ingresos'],
  //       datasets: [{
  //         label: 'Valor por mes',
  //         data: valoresFinales,
  //         borderColor: 'rgb(35, 19, 249)',
  //         backgroundColor: 'rgba(87, 8, 244, 0.5)',
  //         borderSkipped: false,
  //       }]
  //     },
  //     options: {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },title: {
  //       display: true,
  //       text: 'Ventas del mes actual'
  //     }}}
  //   });
  // }

  ngAfterViewInit(): void {
    // No es necesario crear el gráfico aquí, se crea al recibir los datos
  }
}
