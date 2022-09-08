import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { BodegaProductoComponent } from './components/productos/bodega-producto/bodega-producto.component';
import { CreateTicketComponent } from './components/tickets/create-ticket/create-ticket.component';
import { IndexTicketComponent } from './components/tickets/index-ticket/index-ticket.component';
import { UpdateTicketComponent } from './components/tickets/update-ticket/update-ticket.component';
import { ConfigComponent } from './components/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    UpdateProductoComponent,
    BodegaProductoComponent,
    CreateTicketComponent,
    IndexTicketComponent,
    UpdateTicketComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({

      baseURL: '../../../assets/tinymce/'

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
