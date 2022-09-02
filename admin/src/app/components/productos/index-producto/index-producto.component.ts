import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast:any;
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token:any;
  public productos: Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 10;
  public load_btn = false;

  constructor(

    private _productoService: ProductoService


  ) {

   this.token = localStorage.getItem('token');
   this.url = GLOBAL.url
  }

  ngOnInit(): void {
  
    this.init_data();
  
  }

  init_data(){

    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(

      response=>{
        console.log(response);
        this.productos = response.data;
        this.load_data = false;


      },

      error=>{
        console.log(error);


      }

    );
  }
  
  
  filtrar(){

  if(this.filtro){
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(

      response=>{
        console.log(response);
        this.productos = response.data;
        this.load_data = false;


      },

      error=>{
        console.log(error);


      }

    )


  }else{

    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'Ingrese un filtro de búsqueda',
      messageColor: 'blue'
    });

  }
}


resetear(){
  this.filtro = '';
  this.init_data();
}

eliminar(id:any){
  this.load_data = true;
  this._productoService.eliminar_producto_admin(id, this.token).subscribe(

    response=>{
      iziToast.show({
        title: 'Success',
        titleColor: 'green',
        class: 'text-success',
        position: 'topLeft',
        message: 'Producto eliminado correctamente',
        messageColor: 'blue'
      })

      $('#delete-' + id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.load_btn = false;
    
    this.init_data();
    
    },

    error=>{
      iziToast.show({
        title: 'Success',
        titleColor: 'green',
        class: 'text-success',
        position: 'topLeft',
        message: 'ocurrió un error en el servidor',
        messageColor: 'blue'
      })
      
      console.log(error);
      this.load_btn = false;


    }


  )

}

}
