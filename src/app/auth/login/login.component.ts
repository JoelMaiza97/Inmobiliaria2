import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private sidebarService: SidebarService) { }

  public loginForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email ]],
    password: ['',[Validators.required]],
  });

  ngOnInit(): void {
  }

  
  usuarios: UsuarioModel[] = [];
  aux = 0;


  login(){
    //console.log(this.loginForm.value['password']);
    this.auth.Login(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      this.auth.getUsuarios().subscribe(resp => {
        this.usuarios = resp;
        console.log(this.usuarios);
        for (let i = 0; i < this.usuarios.length; i++) {
          const element = this.usuarios[i];
          if (element.email === localStorage.getItem('correo') && element.tipo === 'administrador') {
            this.aux = 1;
            i = this.usuarios.length;
          } else if(element.email === localStorage.getItem('correo') && element.tipo === 'repartidor') {
            this.aux = 2;
            i = this.usuarios.length;
          }
        }
        localStorage.setItem('var',this.aux.toString());
      });
      localStorage.setItem('correo', resp.email);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        text: 'Bienvenido', 
        preConfirm: () => { window.location.reload();}
      });
      this.router.navigateByUrl('/dashboard');
    },(err)=>{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    })
  }
}
