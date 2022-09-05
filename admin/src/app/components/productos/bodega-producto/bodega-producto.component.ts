import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-bodega-producto',
  templateUrl: './bodega-producto.component.html',
  styleUrls: ['./bodega-producto.component.css']
})
export class BodegaProductoComponent implements OnInit {

  public id:any;
  public token:any;
  public producto: any = {};
  public bodegas: Array<any> = [];
  public load_btn = false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService

  ) {

    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
  
    this._route.params.subscribe(

      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;


            }else{

              this.producto = response.data
              console.log(this.producto);

              this._productoService.listar_bodega_producto_admin(this.producto._id, this.token).subscribe(

                response=>{
                  this.bodegas = response.data;


                },

                error=>{
                  console.log(error);


                }
              
              )
              
            }
          },
          error=>{
            console.log(error);


          }
        )
      }

    );
  
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_bodega_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se eliminó correctamente el producto.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        this._productoService.listar_bodega_producto_admin(this.producto._id,this.token).subscribe(
          response=>{
             this.bodegas = response.data;
             console.log(this.bodegas);
             
          },
          error=>{
           console.log(error);
           
          }
        )

        
      },
      error=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Ocurrió un error en el servidor.'
        });
        console.log(error);
        this.load_btn = false;
      }
    )
    }
  }
