import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
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
  public token:any;
  public load_btn = false;
 
 
  constructor(

    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router

  ) {

    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

registro(registroForm:any){
  if(registroForm.valid){
    this.load_btn = true;
    console.log(this.producto);
    console.log(this.file);

    this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(

      response=>{
        iziToast.show({
          title: 'Success',
          titleColor: 'green',
          class: 'text-success',
          position: 'topLeft',
          message: 'se registró correctamente el nuevo producto',
          messageColor: 'blue'
        })

        this.load_btn = false;
       
        this._router.navigate(['/panel/productos']);
      
      },

      error=>{
        console.log(error);
        this.load_btn = false;


      }

    );
  
  
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
