import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormsModule ,FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { ProductosModel } from '../../models/productos.model';
import { ProductosService } from "src/app/services/productos.service";

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  productoNuevo: ProductosModel = new ProductosModel();
  dataModel: any = {};
  productos: ProductosModel[] = [];

  constructor(private productosService: ProductosService,
    private http: HttpClient,
    private router: Router) { 
      this.productoNuevo.estado = true;
      this.productoNuevo.iva = true;
      //this.productoNuevo.id = localStorage.getItem('Item');
    if(localStorage.getItem('Item')!=''){
      this.productosService.getProductos()
      .subscribe((resp) => {this.productos = resp,this.productos.forEach(element => {
        if(localStorage.getItem('Item')==element.id){
          this.productoNuevo.nombre = element.nombre;
          this.productoNuevo.precio = element.precio;
          this.productoNuevo.categoria = element.categoria;
          this.productoNuevo.imagen = element.imagen;
        }
      });});
    }
    }

  ngOnInit(): void {
  }

  AgregarProducto() {
    /* this.productosService.subirFoto().subscribe(resp=>{
      console.log(resp);
    }); */
  }

  private url = "";
  private image: any;

  ObtenerImagen(event) {
    this.image = <File>event.target.files[0];
    console.log(this.image);
  }

  mostrar() {
    console.log(this.image);
    
  }

  private urlCloudinary =
    "https://api.cloudinary.com/v1_1/latamarket/upload?upload_preset=preset_market";

  subirFoto() {
    const fd = new FormData();
    fd.append("file", this.image, this.image.name);
    return this.http.post(this.urlCloudinary, fd).subscribe((res) => {
      console.log(res["url"]);
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  recargar(){
    this.router.navigateByUrl('/dashboard/productos');
  }

  guardar(form: NgForm) {
   /*  if (form.invalid) {
      console.log("Formulario no valido");
      return;
    } */
    const fd = new FormData();

    if(this.productoNuevo.id){
      fd.append("file", this.image, this.image.name);
      return this.http.post(this.urlCloudinary, fd).subscribe((res) => {
      this.productoNuevo.imagen = res["url"];
      this.productoNuevo.cantidad = 0;
      this.productosService.actualizarProductoCompleto(this.productoNuevo).subscribe(resp=>{
        console.log(resp);
        localStorage.setItem('Item','');
        Swal.fire({
          title: "Listo",
          text: "Producto Actualizado",
          icon: "success",
          preConfirm: () => { window.location.reload();}
        });
      })
      this.recargar();
    });
    }else{
    fd.append("file", this.image, this.image.name);
    return this.http.post(this.urlCloudinary, fd).subscribe((res) => {
      this.productoNuevo.imagen = res["url"];
      this.productoNuevo.cantidad = 0;
      this.productosService.crearProducto(this.productoNuevo).subscribe(resp=>{
        console.log(resp);
        Swal.fire({
          title: "Listo",
          text: "Producto Creado",
          icon: "success",
          preConfirm: () => { window.location.reload();}
        });
      })
      this.recargar();
    });
    
    /* this.productosService.crearProducto(this.producto).subscribe((resp) => {
      console.log(resp);
    }); */
    }
  }

}
