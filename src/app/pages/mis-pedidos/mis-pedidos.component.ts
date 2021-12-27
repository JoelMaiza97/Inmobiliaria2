import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styles: [
  ]
})

export class MisPedidosComponent implements OnInit {

  i = 1;

  Aumentar(){
    this.i = this.i + 1;
  }

  pedidos = [];

  constructor(private pedidosService: PedidosService, public modal: NgbModal) {
    this.pedidosService.obtenerPedidos().subscribe(resp => {
      for (let i = 0; i < resp.length; i++) {
        if(resp[i][1]['correo'] == localStorage.getItem('correo')){
          this.pedidos.push(resp[i]);
          console.log(this.pedidos);
        }
        
      }
     // console.log(resp);
    });
   }

  ngOnInit(): void {
  }

}
