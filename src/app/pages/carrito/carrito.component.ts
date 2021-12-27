import { Component, OnInit } from '@angular/core';
import { ProductosModel } from 'src/app/models/productos.model';
import { CarritoModel } from 'src/app/models/carrito.model';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: [
  ]
})
export class CarritoComponent implements OnInit {

  carrito = [];
  carrito2 = [];
  productos: ProductosModel[] = [];
  productosCarrito: CarritoModel[] = [];
  productoUnico: CarritoModel;
  subtotal;
  subiva = 0;
  iva;
  lista;
  indiceSeleccionado;
  opcionSeleccionada;
  valorSeleccionada;

  Editar(producto){
    this.valorSeleccionada = (<HTMLInputElement>document.getElementById("cantidad")).value;
    console.log(this.valorSeleccionada);
  }

  constructor(private productosService: ProductosService) { 
    //Carga de productos a la tabla con precios y calculo de total
    for (let i = 0; i < localStorage.length; i++) {
       if(!(localStorage.key(i)==='correo'||localStorage.key(i)==='var'||localStorage.key(i)==='token')){
          this.carrito.push(localStorage.key(i));
       }
    }
    this.productosService.getProductos().subscribe((resp) => (
      (this.productos = resp),
      this.productos.forEach((element) => {
        if (localStorage.getItem(element.id)!=null) {
          //console.log(localStorage.key(Number(element.id)));
          element.cantidad = Number(localStorage.getItem(element.id));
          //Verificando si hay o no iva y sumando en acumulador subiva
          if (element.iva) {
            this.subiva = this.subiva + ((element.precio*element.cantidad) * 0.12);
            console.log(this.subiva);
          }   
          } else {
          element.cantidad = 0;
          }
      }),
      //Multiplicacion de precio por cantidad
      this.productos.forEach((element) => {
        if (element.cantidad >= 1) {
          this.carrito2.push(element);
        }
        this.aux = element.cantidad * element.precio;
        if (this.aux >= 0) {
          this.totalCarrito = Number((this.totalCarrito + element.cantidad * element.precio).toFixed(2));
        }
        console.log(this.totalCarrito);
        this.j++;
      }),
      
      //Calculo de totales
      this.iva = this.subiva.toFixed(2),
      this.subtotal = (this.totalCarrito - this.iva).toFixed(2)
      //(this.correo = localStorage.getItem("correo"))
    ));
  }

  ngOnInit(): void {
  }

  mostrarIva(iva){
    if (iva == true) {
      return "Con iva"
    } else {
      return "Sin iva"
    }
  }

  existeProducto(){
    return true;
  }  

  i = 0;
  j = 0;
  totalCarrito = 0;
  aux = 0;
  correo = "";

  getNombres(carrito){
    
    return 0;
  }

  QuitarProducto(producto){
    localStorage.removeItem(producto);
    window.location.reload();
  }

  cantidades(carrito){
    return localStorage.getItem(carrito);
  }


  //Metodo para verificar si hay existencias en el carrito
  exiteCarrito(){
    if(this.carrito2.length >= 1){
      return true;
    }else{
      return false;
    }
  }

  NoexiteCarrito(){
    if(this.carrito2.length == 0){
      return true;
    }else{
      return false;
    }
  }

}
