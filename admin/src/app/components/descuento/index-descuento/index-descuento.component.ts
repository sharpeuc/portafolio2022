import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast: any;
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token:any;
  public descuentos: Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 10;
  public load_btn = false;

  constructor(

    private _descuentoService: DescuentoService


  ) {

   this.token = localStorage.getItem('token');
   this.url = GLOBAL.url
  }

  ngOnInit(): void {
  
    this.init_data();
  
  }

  init_data(){

    this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(

      response=>{
        console.log(response);
        this.descuentos = response.data;

        this.descuentos.forEach(element =>{

          var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;
          var tt_termino = Date.parse(element.fecha_termino+"T00:00:00")/1000;

          var today = Date.parse(new Date().toString())/1000;

         if(today>tt_inicio){

          element.estado = 'Expirado';

         }

         if(today<tt_inicio){

          element.estado = 'Proximamente';

         }

         if(today>= tt_inicio && today<= tt_termino){

          element.estado = 'En progreso';


         }
        
        });
        
        
        this.load_data = false;


      },

      error=>{
        console.log(error);


      }

    );
  }

 
  filtrar(){

    if(this.filtro){
      this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(
  
        response=>{
          console.log(response);
          this.descuentos = response.data;
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
    this._descuentoService.eliminar_descuento_admin(id, this.token).subscribe(
  
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




