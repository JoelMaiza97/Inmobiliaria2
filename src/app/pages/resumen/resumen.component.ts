import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { element } from 'protractor';
import { ProductosModel } from '../../models/productos.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(public modal:NgbModal, private route: ActivatedRoute, private servicePedido: PedidosService, private productoService: ProductosService) { }

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

  ngOnInit(): void {
    this.servicePedido.obtenerPedidos().subscribe(resp => {
      this.pedidos = resp;
      for (let i = 0; i < this.pedidos.length; i++) {
        if(this.pedidos[i][5]==false){
          this.pedidoInicial.push(this.pedidos[i]);
          this.pedidosProductos.push(this.pedidos[i][1]);
          //console.log(this.pedidosFinal);
        } 
      }
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
      })
    });
  }

}
