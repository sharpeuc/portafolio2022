import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
declare var iziToast:any;
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {

    categoria: ''

  };
  public file:any= undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/images.jpg';
  public config : any = {};
 
 
  constructor(


  ) {

    this.config = {
      height: 500
    }
  
  }

  ngOnInit(): void {
  }

registro(registroForm:any){
  if(registroForm.valid){
    console.log(this.producto);
    console.log(this.file);
  
  
  }else{
    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'los datos del formulario no son válidos',
      messageColor: 'blue'
    })

    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/images.jpg';
    this.file = undefined;
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

  if(file.size <= 4000000){

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
      message: 'la imagen no puede superar los 4MB',
      messageColor: 'blue'
    })
  
  $('#input-portada').text('Seleccionar imagen');
  this.imgSelect = 'assets/img/images.jpg';
  this.file = undefined;
  
  }
  console.log(this.file);
 }
}
