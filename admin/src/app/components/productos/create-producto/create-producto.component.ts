import { Component, OnInit } from '@angular/core';
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {};
  public file:any=undefined;
 
  constructor() { }

  ngOnInit(): void {
  }

registro(registroForm:any){

  if(registroForm.valid){


  }else{

    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'los datos del formulario no son válidos',
      messageColor: 'blue'
    })

  }


}
 fileChangeEvent(event:any):void{

  var file:any;

  if(event.target.files && event.target.files[0]){
    file = <any>event.target.files[0];
    console.log(file);

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


 }
}
