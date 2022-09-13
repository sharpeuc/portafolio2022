import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast: any;
import { v4 as uuidv4 } from 'uuid';
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token:any;
  public config: any = {};
  public titulo_cat = '';
  public icono_cat = '';
  public file: any = undefined;
  public imgSelect: any;
  public url:any;

  constructor(
    private adminService: AdminService
    
    ) {

      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;
      this.adminService.obtener_config_admin(this.token).subscribe(

        response=>{
          this.config = response.data;
          this.imgSelect = this.url+ 'obtener_logo/'+this.config.logo;

        },
      error=>{
        console.log(error);


      }
        )
     }

  ngOnInit(): void {
  }

agregar_cat(){

  if(this.titulo_cat && this.icono_cat){
    console.log(uuidv4());
    
    this.config.categorias.push({

      titulo: this.titulo_cat,
      icono: this.icono_cat,
      _id:uuidv4()
    })

    this.titulo_cat = '';
    this.icono_cat = '';
  
  
  }else{

    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'debe ingresar un titulo y un icono para la categoria',
      messageColor: 'blue'
    })

  }

}

actualizar(configForm:any){

  if(configForm.valid){

    let data = {

      titulo: configForm.value.titulo,
      serie: configForm.value.serie,
      correlativo: configForm.value.correlativo,
      categorias: this.config.categorias,
      logo: this.file

    }

    console.log(data);

    this.adminService.actualiza_config_admin("6319fbac8f8164a36bd47090",data, this.token).subscribe(

      response=>{
        iziToast.show({
          title: 'Success',
          titleColor: 'green',
          class: 'text-success',
          position: 'topLeft',
          message: 'configuración actualizada correctamente',
          messageColor: 'blue'
        })

      },
    )

  }else{
    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'complete correctamente el formulario',
      messageColor: 'blue'
    })

  }

}

fileChangeEvent(event:any){
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
      $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
      $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
      reader.readAsDataURL(file);
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

ngDoCheck():void{

  $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
}

eliminar_categoria(idx:any){

  this.config.categorias.splice(idx, 1);

}

}
