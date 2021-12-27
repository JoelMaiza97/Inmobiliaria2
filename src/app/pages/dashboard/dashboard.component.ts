import { Component, OnInit } from '@angular/core';
import { ProductosModel } from 'src/app/models/productos.model';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  condicionPizzas: boolean = true;
  condicionHamburguesas: boolean = true;
  condicionBebidas: boolean = true;

  productos: ProductosModel[] = [];
  bebidas: ProductosModel[] = [];
  pizzas: ProductosModel[] = [];
  hamburguesas: ProductosModel[] = [];
  categorias = [];
  numero: number;

  constructor(private productosService: ProductosService) {
    this.productosService.getProductos().subscribe(resp => {
      this.productos = resp;
      for (let i = 0; i < this.productos.length; i++) {
        if (!this.categorias.includes(this.productos[i].categoria)) {
          this.categorias.push(this.productos[i].categoria);
        }
        if (this.productos[i].categoria === "Bebidas") {
          this.bebidas.push(this.productos[i]);
        } else if(this.productos[i].categoria === "Pizzas") {
          this.pizzas.push(this.productos[i]);
        }else if (this.productos[i].categoria === "Hamburguesas"){
          this.hamburguesas.push(this.productos[i]);
        }
      }
    });
  }

  condicionCategoria(){
    return true;
  }

  ngOnInit(): void {
  }

  condicionPizza(categoria){
    if (this.condicionPizzas == false && categoria=="Pizzas") {
      this.condicionPizzas = true;
    } else if(categoria=="Pizzas"){
      this.condicionPizzas = false;
    }
    if (this.condicionHamburguesas == false && categoria=="Hamburguesas") {
      this.condicionHamburguesas = true;
    } else if(categoria=="Hamburguesas"){
      this.condicionHamburguesas = false;
    }
    if (this.condicionBebidas == false && categoria=="Bebidas") {
      this.condicionBebidas = true;
    } else if(categoria=="Bebidas"){
      this.condicionBebidas = false;
    }
  }

  agregar(producto: ProductosModel){
    if(localStorage.getItem(producto.id)){
      this.numero = +localStorage.getItem(producto.id) + 1;
      localStorage.setItem(producto.id,this.numero.toString());
    }else{
      localStorage.setItem(producto.id,'1');
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      text: 'Producto Agregado'
    });
  }

  quitar(producto: ProductosModel){
    if((localStorage.getItem(producto.id)>'0')){
      if(localStorage.getItem(producto.id)){
        this.numero = +localStorage.getItem(producto.id) - 1;
        localStorage.setItem(producto.id,this.numero.toString());
      }
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        text: 'Producto quitado'
      });
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'No tiene este producto en el carrito'
      });
    }
  }

  //Metodo para verificar la cantidad de productos en el carrito
  cantidad(id){
    if(localStorage.getItem(id)){
      return localStorage.getItem(id)
    }else{
      return 0;
    }
  }
}
