import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { ProductosModel } from 'src/app/models/productos.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
  ]
})
export class ReportesComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  words;
  public pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(252,255,51,0.3)','rgba(255,151,0,0.3)','rgba(143,0,255,0.3)', 'rgba(0,133,0,0.3)','rgba(0,255,0,0.3)','rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)',],
    },
  ];

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  changeLabels(): void {
    var words = [];
    this.pieChartData = [];
    this.pieChartLabels = [];
    var contador = 0;
    for (let i = 0; i < this.cantidadesProductos.length; i++) {
      if(this.cantidadesProductos[i]['cantidad']>=1){
        contador++;
        //words.push(this.cantidadesProductos[i]['nombre']);
        this.pieChartData.push(this.cantidadesProductos[i]['cantidad']);
        this.pieChartLabels.push(this.cantidadesProductos[i]['nombre']);
      }
    }
    console.log(this.pieChartLabels);
    //var randomWord = () => words[Math.trunc(Math.random() * words.length)];
    
    console.log(this.pieChartLabels);
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(255,0,0,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  pedidos;
  pedidosFinal = [];
  productos;
  producto;
  numero;
  pedidoInicial = [];
  pedidoSuma;
  totalProductos;
  cantidadesProductos;
  pedidosProductos = [];
  pedido;
  productosTotales: ProductosModel = new ProductosModel();

  constructor(public modal:NgbModal, private route: ActivatedRoute, private servicePedido: PedidosService, private productoService: ProductosService) { 
    this.servicePedido.obtenerPedidos().subscribe(resp => {
      this.pedidoInicial = resp;
      this.pedido = Object.entries(this.pedidosProductos);
      for (let i = 0; i < this.pedidoInicial.length; i++) {
        //console.log(this.pedidoInicial[i]);
        this.productos = Object.entries(this.pedidoInicial[i][1]);
        //console.log(this.productos);
        for (let j = 0; j < this.productos.length; j++) {
          this.pedidosFinal.push(this.productos[j]);
        }
      }
      //console.log(this.pedidosFinal.length);
      this.productoService.getProductos().subscribe(resp => {
          this.totalProductos = resp.length;
          this.cantidadesProductos = resp;
          //console.log(this.totalProductos);
          for (let i = 0; i < this.totalProductos; i++) {
            for (let j = 0; j < this.pedidosFinal.length; j++) {
              //console.log(this.pedidosFinal[j][0]);
              //console.log(this.cantidadesProductos[i].id);
              if(this.cantidadesProductos[i].id == this.pedidosFinal[j][0]){
                this.cantidadesProductos[i].cantidad = Number(this.cantidadesProductos[i].cantidad) + Number(this.pedidosFinal[j][1]);
              }
            }
          }
          var words = [];
    this.pieChartData = [];
    this.pieChartLabels = [];
    var contador = 0;
    for (let i = 0; i < this.cantidadesProductos.length; i++) {
      if(this.cantidadesProductos[i]['cantidad']>=1){
        contador++;
        //words.push(this.cantidadesProductos[i]['nombre']);
        this.pieChartData.push(this.cantidadesProductos[i]['cantidad']);
        this.pieChartLabels.push([this.cantidadesProductos[i]['nombre']]);
      }
    }
    console.log(this.pieChartLabels);
    //var randomWord = () => words[Math.trunc(Math.random() * words.length)];
    
    console.log(this.pieChartLabels);
      })
      
    });

    
  }

  ngOnInit(): void {
    
  }

}
