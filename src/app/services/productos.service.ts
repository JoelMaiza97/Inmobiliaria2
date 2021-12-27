import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductosModel } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  private urlDataBase = 'https://proyectoweb-aea11-default-rtdb.firebaseio.com/';
  private apiKey = 'AIzaSyAJvZH4ap2gEA3VkymRNgfVM4pCEmDtqe4';
  private token = localStorage.getItem('token') || '';

  getProductos(){
    return this.http.get(`${this.urlDataBase}/productos.json`).pipe(map(this.crearArreglo));
  };

  crearArreglo(productoObj: object){
    const usuarios: ProductosModel[] = [];
    //console.log(usuarioObj);
    if (productoObj === null) {
      return [];
    }
    Object.keys(productoObj).forEach(key => {
      const usuario: ProductosModel = productoObj[key];
      usuario.id = key;
      usuarios.push(usuario);
    })
    return usuarios;
  }


  //Activar o desactivar producto y tambien sirve para el iva
  actualizarProducto(id , operations){
    return this.http.patch(`${this.urlDataBase}/productos/${id}.json`, operations);
  }

  //Metodo para boton editar (Actualizar producto completo)
  actualizarProductoCompleto( producto: ProductosModel ){
    return this.http.put(`${this.urlDataBase}/productos/${producto.id}.json`,producto);
  }

  //Crear productos
  crearProducto( producto: ProductosModel ){
    return this.http.post(`${this.urlDataBase}/productos.json`,producto);
  }
}
