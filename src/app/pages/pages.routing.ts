import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AuthGuard } from '../guards/auth.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'reportes', component: ReportesComponent },
          { path: 'pedidos', component: PedidosComponent },
          { path: 'productos', component: ProductosComponent },
          { path: 'detallePedido/:id', component: DetalleProductoComponent },
          { path: 'producto', component: ProductoComponent },
          { path: 'nuevoProducto', component: NuevoProductoComponent },
          { path: 'mispedidos', component: MisPedidosComponent },
          { path: 'carrito', component: CarritoComponent },
          { path: 'resumen', component: ResumenComponent },
          { path: 'factura', component: FacturaComponent },
        ],
    },
    
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
