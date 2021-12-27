import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoModel } from '../../models/pedido.model';
import Swal from 'sweetalert2';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: [
  ]
})
export class PedidosComponent implements OnInit {

  pedidos;

  constructor(private pedidosService: PedidosService, public modal: NgbModal, private route: ActivatedRoute) {
    this.pedidosService.obtenerPedidos().subscribe(resp => {
      this.pedidos = resp;
     // console.log(resp);
    });
  }

  ngOnInit(): void {

    //const id = this.route.snapshot.paramMap.get('id');
    //console.log(id);
  }

  //Metodo para despachar productos 
  Despachar(id){
    const operaciones = {"5": true};
    return this.pedidosService.actualizarPedidos(id, operaciones).subscribe(resp => {
      //console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Pedido Despachado',
        preConfirm: () => { window.location.reload();}
      });
    });
  }

}
