import {Routes, RouterModule } from "@angular/router";
import { NgModule, ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import {AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { BodegaProductoComponent } from "./components/productos/bodega-producto/bodega-producto.component";
import { CreateTicketComponent } from "./components/tickets/create-ticket/create-ticket.component";
import { IndexTicketComponent } from "./components/tickets/index-ticket/index-ticket.component";
import { UpdateTicketComponent } from "./components/tickets/update-ticket/update-ticket.component";
import { ConfigComponent } from "./components/config/config.component";
import { VariedadProductoComponent } from "./components/productos/variedad-producto/variedad-producto.component";
import { GaleriaProductoComponent } from "./components/productos/galeria-producto/galeria-producto.component";
import { CreateDescuentoComponent } from "./components/descuento/create-descuento/create-descuento.component";
import { IndexDescuentoComponent } from "./components/descuento/index-descuento/index-descuento.component";
import { EditDescuentoComponent } from "./components/descuento/edit-descuento/edit-descuento.component";
import { IndexContactoComponent } from "./components/contacto/index-contacto/index-contacto.component";
import { IndexVentasComponent } from "./components/ventas/index-ventas/index-ventas.component";
import { DetalleVentasComponent } from "./components/ventas/detalle-ventas/detalle-ventas.component";

const appRoute: Routes = [
    {path:'', redirectTo: 'inicio', pathMatch: 'full'},
    
    {path: 'inicio', component: InicioComponent, canActivate:[AdminGuard]},
    
    {path: 'panel', children: [
        {path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard]},
        {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard]},
        {path: 'clientes/:id', component: EditClienteComponent, canActivate: [AdminGuard]},

        {path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard]},
        {path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard]},
        {path: 'productos/:id', component: UpdateProductoComponent, canActivate: [AdminGuard]},
        {path: 'productos/bodega/:id', component: BodegaProductoComponent, canActivate: [AdminGuard]},
        {path: 'productos/variedades/:id', component: VariedadProductoComponent, canActivate: [AdminGuard]},
        {path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard]},


        
        {path: 'tickets/registro', component: CreateTicketComponent, canActivate: [AdminGuard]},
        {path: 'tickets', component: IndexTicketComponent, canActivate: [AdminGuard]},
        {path: 'tickets/:id', component: UpdateTicketComponent, canActivate: [AdminGuard]},

        {path: 'descuentos', component: IndexDescuentoComponent, canActivate: [AdminGuard]},
        {path: 'descuentos/registro', component: CreateDescuentoComponent, canActivate: [AdminGuard]},
        {path: 'descuentos/:id', component: EditDescuentoComponent, canActivate: [AdminGuard]},
        
        {path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard]},

        {path: 'ventas', component: IndexVentasComponent, canActivate: [AdminGuard]},

        {path: 'ventas/:id', component: DetalleVentasComponent, canActivate: [AdminGuard]},


        {path: 'contactos', component: IndexContactoComponent, canActivate: [AdminGuard]},


    ]},
    
    {path:'login', component: LoginComponent}  
]

export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);