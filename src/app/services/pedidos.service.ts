import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoModel } from '../models/pedido.model';
import { map } from 'rxjs/internal/operators/map';
import { compare, Operation } from 'fast-json-patch';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private urlDataBase = 'https://proyectoweb-aea11-default-rtdb.firebaseio.com/';
  private apiKey = 'AIzaSyAJvZH4ap2gEA3VkymRNgfVM4pCEmDtqe4';

  constructor(private http: HttpClient) { }

  //Creacion de pedidos
  crearPedidos(pedidoForm){
    return this.http.post(`${this.urlDataBase}/pedidos.json`, pedidoForm);
  }

  //Obtencion de pedidos
  obtenerPedidos(){
    return this.http.get(`${this.urlDataBase}/pedidos.json`).pipe(map(this.crearArreglo));
  }

  crearArreglo(usuarioObj: object){
    const pedidos: PedidoModel[] = [];
    //console.log(usuarioObj);
    if (usuarioObj === null) {
      return [];
    }
    Object.keys(usuarioObj).forEach(key => {
      const pedido: PedidoModel = usuarioObj[key];
      pedido.id = key;
      pedidos.push(pedido);
    })
    return pedidos;
  }

  crearArregloUniversal(usuarioObj: object){
    const productos = [];
    //console.log(usuarioObj);
    if (usuarioObj === null) {
      return [];
    }
    Object.keys(usuarioObj).forEach(key => {
      const pedido: PedidoModel = usuarioObj[key];
      productos.push(pedido);
    })
    return productos;
  }


  //Despachar pedidos
  actualizarPedidos(id , operations){
    return this.http.patch(`${this.urlDataBase}/pedidos/${id}.json`, operations);
    
  }

  getPedido(id:string){
    return this.http.get(`${this.urlDataBase}/pedidos/${id}.json`).pipe(map(this.crearArregloUniversal));
  }
}
