export class Direccion{
    constructor(public lat: number,public lng: number){
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
            //this.address.emit(result.formatted_address);  
            //this.fillInputs(result.formatted_address);
          } else {
            alert("No address available!");
          }
        }
      }
    })
    }
}