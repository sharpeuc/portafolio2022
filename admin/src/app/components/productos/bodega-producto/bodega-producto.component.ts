import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import { isNgTemplate } from '@angular/compiler';
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
  public _iduser:any;
  public producto: any = {};
  public bodegas: Array<any> = [];
  public arr_bodega: Array<any> = [];
  public load_btn = false;
  public bodega: any = {};


  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService

  ) {

    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
    console.log(this._iduser);
   }

  ngOnInit(): void {
  
    this._route.params.subscribe(

      params=>{
        this.id = params['id'];
        
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

                  this.bodegas.forEach(element =>{
             
                    this.arr_bodega.push({
        
                      Admin: element.admin.nombres + '' + element.admin.apellidos,
                      Cantidad: element.cantidad,
                      Productor: element.productor
        
                    })
        
                    });


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
             
             
          },
          error=>{
           
           
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
  
    registro_bodega(bodegaForm:any){
      if(bodegaForm.valid){
        
        let data = {

          producto: this.producto._id,
          cantidad: bodegaForm.value.cantidad,
          admin: this._iduser,
          productor: bodegaForm.value.productor

        }

        this._productoService.registro_bodega_producto_admin(data, this.token).subscribe(

          response=>{

            iziToast.show({
              title: 'Success',
              titleColor: 'green',
              class: 'text-success',
              position: 'topLeft',
              message: 'se agregó el nuevo stock al producto',
              messageColor: 'blue'
            })
            
            this._productoService.listar_bodega_producto_admin(this.producto._id, this.token).subscribe(

              response=>{
                this.bodegas = response.data;


              },

              error=>{
                console.log(error);


              }
            
            )
            
            
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
          message: 'los datos del formulario no son válidos',
          messageColor: 'blue'
        });
    
      }

    }
    download_excel(){

      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Reporte de productos en bodega");
    
      worksheet.addRow(undefined);
      for (let x1 of this.arr_bodega){
        let x2=Object.keys(x1);
    
        let temp=[]
        for(let y of x2){
          temp.push(x1[y])
        }
        worksheet.addRow(temp)
      }
    
      let fname='REP01- ';
    
    
    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Productor', key: 'col3', width: 25},
     
    ]as any;
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
    }
  
  }
