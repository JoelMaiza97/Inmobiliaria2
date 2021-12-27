import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormsModule ,FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { ProductosModel } from '../../models/productos.model';
import { ProductosService } from "src/app/services/productos.service";

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductosModel = new ProductosModel();
  dataModel: any = {};
  productos: ProductosModel[] = [];

  constructor(private productosService: ProductosService,
    private http: HttpClient,
    private router: Router) { 
      this.producto.estado = true;
      this.producto.iva = true;
      this.producto.id = localStorage.getItem('Item');
    if(localStorage.getItem('Item')!=''){
      this.productosService.getProductos()
      .subscribe((resp) => {this.productos = resp,this.productos.forEach(element => {
        if(localStorage.getItem('Item')==element.id){
          this.producto.nombre = element.nombre;
          this.producto.precio = element.precio;
          this.producto.categoria = element.categoria;
          this.producto.imagen = element.imagen;
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

    if(this.producto.id){
      fd.append("file", this.image, this.image.name);
      return this.http.post(this.urlCloudinary, fd).subscribe((res) => {
      this.producto.imagen = res["url"];
      this.producto.cantidad = 0;
      this.productosService.actualizarProductoCompleto(this.producto).subscribe(resp=>{
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
      this.producto.imagen = res["url"];
      this.producto.cantidad = 0;
      this.productosService.crearProducto(this.producto).subscribe(resp=>{
        console.log(resp);
        Swal.fire({
          title: "Listo",
          text: "Producto Editado",
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
