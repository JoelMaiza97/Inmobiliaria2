import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  //title = 'My first AGM project';
  lat = -1.2538731757774586;
  lng = -78.52705257031249;
  geocoder = null;

 // const markerInfo = 
  @Output() valorSalidaX: EventEmitter<number> = new EventEmitter();
  @Output() valorSalidaY: EventEmitter<number> = new EventEmitter();
  @Output() address: EventEmitter<any> = new EventEmitter();
   markerDragEnd(evento) {
    //console.log(evento.latLng.lat(),evento.latLng.lng());
    this.valorSalidaX.emit(evento.latLng.lat());
    this.valorSalidaY.emit(evento.latLng.lng());
    this.getAdrress(evento.latLng.lat(),evento.latLng.lng()); 
  }

  getDirection(lat: number, lng: number){
    this.geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    let request: any = {
      latLng: latlng
    };
    this.geocoder.geocode(request,(results,status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let result = results[0];
        let rsltAdrComponent = result.address_components;
        let resultLength = rsltAdrComponent.length;
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          if (result != null) {
            console.log(result.formatted_address);
            return result.formatted_address;
            //this.fillInputs(result.formatted_address);
          } else {
            alert("Direccion no compatible!");
          }
        }
      }
    })
  }

  getAdrress(lat: number, lng: number){
    this.geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    let request: any = {
      latLng: latlng
    };
    this.geocoder.geocode(request,(results,status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let result = results[0];
        let rsltAdrComponent = result.address_components;
        let resultLength = rsltAdrComponent.length;
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          if (result != null) {
            //console.log(result.formatted_address);
            this.address.emit(result.formatted_address);  
            //this.fillInputs(result.formatted_address);
          } else {
            alert("No address available!");
          }
        }
      }
    })
  }

  constructor(private auth: AuthService) { 
    
    
  }

  getLocation() {
    this.auth.getPosition().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
      this.mapReady;
    });
  }
  
  mapReady(map) {
    this.getAdrress(this.lat,this.lng);
  }

  ngOnInit(): void {
    this.getLocation();
  }

}
