import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  aux = 0;
  nombre;
  menuItems: any[];

  constructor(private authService: AuthService ,private router: Router, private sidebarService: SidebarService, private auth: AuthService) {
    authService.getUsuarios().subscribe(resp => {
      for (let i = 0; i < resp.length; i++) {
        const element = resp[i];
        if(element.email == localStorage.getItem('correo')){
          this.nombre = element.nombre + " " + element.apellido;
          console.log(element.nombre);
        }
      }
    });
  };

  ngOnInit(): void {
    if (localStorage.getItem('var') == "1") {
      this.menuItems = this.sidebarService.menuAdministrador;
    } else if(localStorage.getItem('var') == "2"){
      this.menuItems = this.sidebarService.menuRepartidor;
    }
  }

  Salir(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
