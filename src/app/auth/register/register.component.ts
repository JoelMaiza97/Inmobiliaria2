import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AuthRoutingModule } from '../auth.routing';
import { Router } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { MapsAPILoader } from '@agm/core';
import { GoogleMap } from '@angular/google-maps';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit, AfterContentInit {

  ngAfterViewInit(): void{
    
  }
  
  usuario: UsuarioModel;
  title = 'My first AGM project';
  Coordlat: number = -1.2538731757774586;
  Coordlng: number = 78.52705257031249;
  AddressNow = this.Address;
  public formSubmitted = false;

  public registerForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email ]],
    cedula: ['',[ Validators.required, Validators.minLength(3) ]],
    nombre: ['',[ Validators.required, Validators.minLength(3) ]],
    apellido: ['',[ Validators.required, Validators.minLength(3) ]],
    password: ['',[ Validators.required, Validators.minLength(3) ]],
    password2: ['',[ Validators.required, Validators.minLength(3) ]],
    telefono: ['',[ Validators.required, Validators.maxLength(10) ]],
    direccion: [this.AddressNow,[ Validators.required, Validators.minLength(3) ]],
    coordX: [this.Coordlat,[ Validators.required, Validators.minLength(3) ]],
    coordY: [this.Coordlng,[ Validators.required, Validators.minLength(3) ]],
    tipo: ['cliente',[ Validators.required ]],
    terms: [false,[ Validators.required]],
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {  }
  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.getLocation();
    //this.AddressNow = this.getDirection(this.Coordlat,this.Coordlng);
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

  crearUsuario(){
    //console.log(this.getDirection(this.Coordlat,this.Coordlng));
    console.log('Valor actual'+this.Coordlat);
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    this.registerForm.value['coordX']=this.Coordlat;
    this.registerForm.value['coordY']=this.Coordlng;
    this.registerForm.value['direccion']=this.AddressNow;
    if (this.registerForm.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
  
      this.auth.Registrar(this.registerForm.value).subscribe( resp => {
        localStorage.setItem('correo', resp.email);
        console.log(resp);
        this.auth.crearUsuario(this.registerForm.value).subscribe(resp2 => {
          console.log(resp2);
        }, (err) => {
          console.log(err);
        });
        Swal.close();
        localStorage.setItem('var','0');
        this.router.navigateByUrl('/login');
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al registrar',
          text: err.error.error.message
        });
      })
    }else{
      console.log('FORMULARIO NO ES CORRECTO...');
    }
  }

  getLocation() {
    this.auth.getPosition().then(pos => {
      console.log(pos.lat);
      console.log(pos.lng);
    });
  }

  getDirection(lat: number, lng: number){
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    let request: any = {
      latLng: latlng
    };
    geocoder.geocode(request,(results,status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let result = results[0];
        let rsltAdrComponent = result.address_components;
        let resultLength = rsltAdrComponent.length;
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          if (result != null) {
            //console.log(result.formatted_address);
            //this.fillInputs(result.formatted_address);
          } else {
            alert("Direccion no compatible!");
          }
        }
      }
    })
  }
  
  campoNoValido(campo: string): boolean{
    
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  contraseniasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (!(pass1 === pass2)&&this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
       pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true})
      }
    }
  }

  OnSubmit(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.Registrar(this.registerForm.value).subscribe( resp => {
      console.log(resp);
      Swal.close();
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    })
  }

  GuardarUsuario(){
    
  }
}
