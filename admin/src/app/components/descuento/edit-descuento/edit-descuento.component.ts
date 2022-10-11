import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {

  public descuento : any =  {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public token;
  public load_btn = false;
  public id:any;
  public url;

  constructor(
    private _adminService:AdminService,
    private _descuentoService :DescuentoService,
    private _router:Router,
    private _route: ActivatedRoute
  ) {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
   }
  ngOnInit(): void {
  
    this._route.params.subscribe(

      params=>{
        this.id = params['id'];
        
        this._descuentoService.obtener_descuento_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.descuento = undefined;


            }else{

              this.descuento = response.data
              this.imgSelect = this.url + 'obtener_banner_descuento/' +this.descuento.banner;
            }
          },
          error=>{
            console.log(error);


          }
        )
      }

    );
  
  }
  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
    
      if(this.descuento.descuento >= 1 && this.descuento.descuento <= 100){

        var data: any = {};
  
      if(this.file != undefined){
        data.banner = this.file
  
      }
  
      data.titulo = this.descuento.titulo;
      data.fecha_inicio = this.descuento.fecha_inicio;
      data.fecha_termino = this.descuento.fecha_termino;
      data.descuento = this.descuento.descuento;
      
      this.load_btn = true;
      this._descuentoService.actualizar_descuento_admin(data,this.id,this.token).subscribe(
        response=>{
          console.log(response)
  
          iziToast.show({
            title: 'Success',
            titleColor: 'green',
            class: 'text-success',
            position: 'topLeft',
            message: 'Descuento actualizado correctamente',
            messageColor: 'blue'
          });
  
          this.load_btn = false;
          
          this._router.navigate(['/panel/descuentos']);
  
  
  
        },
        error=>{
          console.log(error);
          this.load_btn = false;
  
  
        }
  
      )
  

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'el descuento debe estar entre 0 y 100%'
      });
      this.load_btn = false;

      }

  
    }else{
  
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topLeft',
        message: 'los datos del formulario no son válidos',
        messageColor: 'blue'
      });
      
      this.load_btn = false;
    }

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
  
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
  
        reader.readAsDataURL(file);
  
        $('#input-portada').text(file.name);
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
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/images.jpg';
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
    
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/images.jpg';
    this.file = undefined;
    
    }
    console.log(this.file);
   }

}
