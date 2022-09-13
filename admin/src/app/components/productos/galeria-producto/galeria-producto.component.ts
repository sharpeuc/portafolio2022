import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jquery: any;
declare var $:any;
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto: any = {};
  public id: any;
  public token: any;
  public file: any = undefined;
  public load_btn = false;
  public url: any;
  public load_data = true;
  public load_btn_eliminar = false;
  
  
  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
    
      ) { 
    
        this.token = localStorage.getItem('token');
        this.url = GLOBAL.url
        this._route.params.subscribe(
    
          params=>{
            this.id = params['id'];

            this.init_data();
            
            this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
              response=>{
                if(response.data == undefined){
                  this.producto = undefined;
    
    
                }else{
    
                  this.producto = response.data
                  
    
                }
                console.log(this.producto);
    
                    },
    
                    error=>{
                      console.log(error);
    
    
                    }
                  
                  )
                  
                }
        );
              }
  
  init_data(){

    this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
      response=>{
        if(response.data == undefined){
          this.producto = undefined;


        }else{

          this.producto = response.data
          

        }
        console.log(this.producto);

            },

            error=>{
              console.log(error);


            }
          
          )
  }

  
  ngOnInit(): void {
  }

  fileChangeEvent(event:any):void{

    var file:any;
  
    if(event.target.files && event.target.files[0]){
      file = <any>event.target.files[0];
      
  
    }else{
  
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topLeft',
        message: 'No hay una imagen de envío',
        messageColor: 'blue'
      })
  
  
    }
  
    if(file.size <= 10000000){
  
      if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
  
        
        this.file = file;
  
  
      }else{
  
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topLeft',
          message: 'Error formato no válido',
          messageColor: 'blue'
        })
        $('#input-img').val('');
        this.file = undefined;
      }
  
  
    }else{
  
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topLeft',
        message: 'la imagen no puede superar los 10MB',
        messageColor: 'blue'
      })
    
    $('#input-img').val('');
    this.file = undefined;
    
    }
    console.log(this.file);
   }


  subir_imagen(){
    if(this.file != undefined){

      let data = {

        imagen: this .file,
        _id: uuidv4()
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(

        response=>{
          this.init_data();
          $('#input-img').val('');
        }
      )


    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topLeft',
        message: 'debe seleccionar una imagen para subir',
        messageColor: 'blue'
      })

    }

  }

  eliminar(id:any){
    this.load_btn_eliminar = true;
    this._productoService.eliminar_imagen_galeria_admin(this.id,{_id:id}, this.token).subscribe(
  
      response=>{
        iziToast.show({
          title: 'Success',
          titleColor: 'green',
          class: 'text-success',
          position: 'topLeft',
          message: 'imagen eliminada correctamente',
          messageColor: 'blue'
        })
  
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
  
        this.load_btn_eliminar = false;
      
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
