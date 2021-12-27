import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) {}

  tipoUsuario: string = 'Sin nombre....';

 

  menuAdministrador: any[] = [
    {
      titulo: 'Administracion',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Pedidos', url: 'pedidos'},
        {titulo: 'Productos', url: 'productos'},
        {titulo: 'Resumen', url: 'resumen'},
        {titulo: 'Reportes', url: 'reportes'},
      ]
    }
  ];

  menuRepartidor: any[] = [
    {
      titulo: 'Repartidor',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Pedidos', url: 'pedidos'},
        {titulo: 'Resumen', url: 'resumen'},
      ]
    }
  ];
}
