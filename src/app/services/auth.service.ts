import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private urlDataBase = 'https://proyectoweb-aea11-default-rtdb.firebaseio.com/';
  private linkRegistro =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private linkLogin =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private apiKey = 'AIzaSyAJvZH4ap2gEA3VkymRNgfVM4pCEmDtqe4';
  private token = localStorage.getItem('token') || '';
  Salir() {}

  Login(usuarioModel: UsuarioModel) {
    const authData = {
      ...usuarioModel,
      returnSecureToken: true,
    };
    return this.http.post(`${this.linkLogin}${this.apiKey}`, authData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.idToken);
      })
    );
  }

  crearArreglo(usuarioObj: object){
    const usuarios: UsuarioModel[] = [];
    //console.log(usuarioObj);
    if (usuarioObj === null) {
      return [];
    }
    Object.keys(usuarioObj).forEach(key => {
      const usuario: UsuarioModel = usuarioObj[key];
      usuario.id = key;

      usuarios.push(usuario);
    })
    return usuarios;
  }

  getUsuarios(){
    return this.http.get(`${this.urlDataBase}/usuarios.json`).pipe(map(this.crearArreglo));
  };

  Registrar(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    };

    return this.http.post(`${this.linkRegistro}${this.apiKey}`, authData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.idToken);
      })
    );
  }

  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.urlDataBase}/usuarios.json`, usuario);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
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
            console.log(result.formatted_address);
            //this.fillInputs(result.formatted_address);
          } else {
            alert("Direccion no compatible!");
          }
        }
      }
    })
  }


  estaAutenticado(): boolean{
    this.token = localStorage.getItem('token') || '';
    return this.token.length > 2;
  }
}
