import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  nombre;

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
  }

  ngOnInit(): void {
  }

  Salir(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
