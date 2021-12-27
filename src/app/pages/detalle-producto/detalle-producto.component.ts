import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PedidosService } from '../../services/pedidos.service';
import { element } from 'protractor';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  pedido = [];
  pedidoInicial = [];
  pedidoFinal = [];
  productos = [];
  ancho;
  j;
  constructor(public modal:NgbModal, private route: ActivatedRoute, private servicePedido: PedidosService, private productoService: ProductosService) { 
   
  }
  final: Number;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //console.log();

    

    this.servicePedido.getPedido(id).subscribe(resp => {
      this.pedido = Object.entries(resp[1]);
      this.ancho = this.pedido.length;
      this.j = 0; 
      this.productoService.getProductos().subscribe(resp2 => {
        for (let i = 0; i < resp2.length; i++) {
          for (let u = 0; u < this.pedido.length; u++) {
            if(this.pedido[u][0] == resp2[i].id){
              this.pedidoInicial.push(resp2[i].nombre,       
                  this.pedido[u][0],
                this.pedido[u][1]);
              this.pedidoFinal.push(this.pedidoInicial);
              this.pedidoInicial = [];
            }
          }
        }
      });
    });
    
  }

}
