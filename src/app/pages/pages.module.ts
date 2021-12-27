
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './mapa/mapa.component';
import { MatCardModule } from '@angular/material/card';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    ReportesComponent,
    PagesComponent,
    PedidosComponent,
    CarritoComponent,
    FacturaComponent,
    MapaComponent,
    MisPedidosComponent,
    DetalleProductoComponent,
    ProductosComponent,
    ProductoComponent,
    NuevoProductoComponent,
    ResumenComponent,
  ],
  exports:[
    DashboardComponent,
    ReportesComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ChartsModule,
    MatCardModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEYuM8fVW0bad0p7kIoPHVKaJltN39QQI'
    })
  ],
})
export class PagesModule {}
