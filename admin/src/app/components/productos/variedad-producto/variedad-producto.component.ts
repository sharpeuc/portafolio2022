import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto: any = {};
  public id: any;
  public token: any;
  public nueva_variedad = '';
  public load_btn = false;
  public url: any;

  constructor(
private _route: ActivatedRoute,
private _productoService: ProductoService

  ) { 

    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url
    this._route.params.subscribe(

      params=>{
        this.id = params['id'];
        
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
          

  ngOnInit(): void {
  }

  agregar_variedad(){

    if(this.nueva_variedad){
      this.producto.variedades.push({titulo:this.nueva_variedad});
      this.nueva_variedad = '';


    }else{

      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topLeft',
        message: 'Debe ser completado el campo de la variedad',
        messageColor: 'blue'
      })
    }
  
    
  
  }

  eliminar_variedad(idx:any){

    this.producto.variedades.splice(idx, 1);
  
  }

actualizar(){

  if(this.producto.titulo_variedad){

this.load_btn = true;
if(this.producto.variedades.length >= 1){

this._productoService.actualizar_producto_variedades_admin({

  titulo_variedad: this.producto.titulo_variedad,
  variedades: this.producto.variedades

},this.id, this.token).subscribe(

  response=>{
    console.log(response);
    iziToast.show({
      title: 'Success',
      titleColor: 'green',
      class: 'text-success',
      position: 'topLeft',
      message: 'variedades actualizadas correctamente',
      messageColor: 'blue'
    });
    this.load_btn = false;


  }
)

}else{
  iziToast.show({
    title: 'Error',
    titleColor: 'red',
    class: 'text-danger',
    position: 'topLeft',
    message: 'se debe agregar al menos una variedad',
    messageColor: 'blue'
  })

}
  
  }else{
    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topLeft',
      message: 'Debe completar el titulo de la variedad',
      messageColor: 'blue'
    })

  }

}

}
