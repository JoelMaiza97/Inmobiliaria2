import { Component, OnInit } from '@angular/core';
import { CarritoModel } from 'src/app/models/carrito.model';
import { ProductosModel } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { PedidosService } from '../../services/pedidos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ]
})
export class FacturaComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router, private productosService: ProductosService, private fb: FormBuilder, private pedidosService: PedidosService) {
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
         if (element.iva) {
           this.subiva = this.subiva + ((element.precio*element.cantidad) * 0.12);
           console.log(this.subiva);
         }   
       } else {
         element.cantidad = 0;
       }
       this.i = this.i + 1;   
     }),
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
     
     this.iva = this.subiva.toFixed(2),
     this.subtotal = (this.totalCarrito - this.iva).toFixed(2),
     (this.correo = localStorage.getItem("correo"))
   ));
  }

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
  datosUsuario;

  Editar(producto){
    this.valorSeleccionada = (<HTMLInputElement>document.getElementById("cantidad")).value;
    console.log(this.valorSeleccionada);
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
    //usuario: UsuarioModel;
  title = 'My first AGM project';
  Coordlat: number = -1.2538731757774586;
  Coordlng: number = 78.52705257031249;
  AddressNow = this.Address;

  getNombres(carrito){
    return 0;
  }

  
  
  get Address(){
    //console.log(this.AddressNow);
    return `${this.AddressNow}`
  }

  get getCoordsX(){
    //console.log(this.Coordlat);
    return `${this.Coordlat}`
  }

  get getCoordsY(){
    //console.log(this.Coordlng);
    return `${this.Coordlng}`
  } 

  cambioValorAddress(valorX: any){
    console.log(valorX);
    this.AddressNow = valorX;
    return valorX;
  }

  cambioValorHijoX(valorX: number){
    //console.log(valorX);
    this.Coordlat = valorX;
  }
  cambioValorHijoY(valorX: number){
    //console.log(valorX);
    this.Coordlng = valorX;
  }

  QuitarProducto(producto){
    localStorage.removeItem(producto);
    window.location.reload();
  }

  cantidades(carrito){
    return localStorage.getItem(carrito);
  }

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

  pedido = [];
  Memoria = [];
  datos: UsuarioModel = new UsuarioModel();


  CargarDatos(){
    this.auth.getUsuarios().subscribe(resp => {
      for (let i = 0; i < resp.length; i++) {
        if(resp[i].email==localStorage.getItem('correo')){
          this.datosUsuario = resp[i];
          this.datos.cedula = this.datosUsuario.cedula;
          this.datos.nombre = this.datosUsuario.nombre;
          this.datos.apellido = this.datosUsuario.apellido;
          this.datos.direccion = this.datosUsuario.direccion;
          this.datos.telefono = this.datosUsuario.telefono;
        }        
      }
    });
  }

  correoRespaldo;
  tokenRespaldo;
  varRespaldo;

  // Metodo para generar los pedidos
  HacerPedido( forma: NgForm ){
    forma.value['direccion']=this.AddressNow;
    console.log(forma.value);
    if(this.totalCarrito == 0 || forma.value['cedula']==null || forma.value['nombre']==null  || forma.value['apellido']==null || forma.value['telefono']==null || forma.value['cedula']== "" || forma.value['nombre'] == ""  || forma.value['apellido'] == "" || forma.value['direccion'] == "" || forma.value['telefono']=="" ){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error',
        text: 'Faltan datos del pedido'
      });
    }else{
        //Almacenamiento de datos de cliente
    this.pedido.push(forma.value);
    console.log(this.pedido);

    //Almacenamiento de detalle de productos y datos de la factura
    this.pedido.push(localStorage);
    this.pedido.push(this.subtotal);
    this.pedido.push(this.iva);
    this.pedido.push(this.totalCarrito);
    this.pedido.push(false);
    this.pedidosService.crearPedidos(this.pedido).subscribe(resp => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Correcto',
        text: 'Pedido Enviado',
        preConfirm: () => { 
          this.correoRespaldo = localStorage.getItem('correo');
          this.tokenRespaldo = localStorage.getItem('token');
          this.varRespaldo = localStorage.getItem('var');
          localStorage.clear();
          localStorage.setItem('correo',this.correoRespaldo);
          localStorage.setItem('token',this.tokenRespaldo);
          localStorage.setItem('var',this.varRespaldo);
          this.router.navigateByUrl('/dashboard'); 
        }
      });
    });
    }
    
  }
}
