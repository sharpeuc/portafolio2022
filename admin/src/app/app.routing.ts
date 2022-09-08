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

        
        {path: 'tickets/registro', component: CreateTicketComponent, canActivate: [AdminGuard]},
        {path: 'tickets', component: IndexTicketComponent, canActivate: [AdminGuard]},
        {path: 'tickets/:id', component: UpdateTicketComponent, canActivate: [AdminGuard]},

        {path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard]},


    ]},
    
    {path:'login', component: LoginComponent}  
]

export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);