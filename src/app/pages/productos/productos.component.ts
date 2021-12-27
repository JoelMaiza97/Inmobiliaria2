import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductosModel } from '../../models/productos.model';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos;

  constructor(private productosService: ProductosService, private router: Router) {
    this.productosService.getProductos().subscribe(resp => {
      this.productos = resp;
    });
  }

  ngOnInit(): void {
  }
  desactivarIVA(id){
    const operaciones = {"iva": false};
    return this.productosService.actualizarProducto(id, operaciones).subscribe(resp => {
      //console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Producto desactivado',
        preConfirm: () => { window.location.reload();}
      });
    });
  }

  activarIVA(id){
    const operaciones = {"iva": true};
    return this.productosService.actualizarProducto(id, operaciones).subscribe(resp => {
      //console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Producto activado',
        preConfirm: () => { window.location.reload();}
      });
    });
  }


  desactivar(id){
    const operaciones = {"estado": false};
    return this.productosService.actualizarProducto(id, operaciones).subscribe(resp => {
      //console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Producto desactivado',
        preConfirm: () => { window.location.reload();}
      });
    });
  }

  activar(id){
    const operaciones = {"estado": true};
    return this.productosService.actualizarProducto(id, operaciones).subscribe(resp => {
      //console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Producto activado',
        preConfirm: () => { window.location.reload();}
      });
    });
  }

  EnviarPagina(id){
    localStorage.setItem('Item',id);
    this.router.navigateByUrl("/dashboard/producto");
  }

}
