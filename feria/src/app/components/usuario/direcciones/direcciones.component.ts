import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public token:any;

  public direccion:any = {

    pais: '',
    region: '',
    provincia: '',
    ciudad: '',
    principal: false
  };

  public regiones: Array<any> = [];
  public provincias: Array<any> = [];
  public comunas: Array<any> = [];


  constructor(
  
  private _guestService: GuestService

  ) { 
    this.token = localStorage.getItem('token');

  }

  ngOnInit(): void {
  }

select_pais(){

  if(this.direccion.pais == 'Chile'){
    $('#sl-region').prop('disabled', false);
    this._guestService.get_regiones().subscribe(
      response=>{
        console.log(response);
        response.forEach((element:{
          id: any; name: any; 
}) => {
          this.regiones.push({

            id: element.id,
            name: element.name
          })
          
        });
      }
    );


  }else{

  $('#sl-region').prop('disabled', true);
  $('#sl-provincia').prop('disabled', true);
   
  this.regiones = [];
  this.provincias = [];

  this.direccion.region = '';
  this.direccion.provincias = '';
  }
}

select_region(){
  this.provincias = [];
  $('#sl-provincia').prop('disabled', false);
  this._guestService.get_provincias().subscribe(
    response=>{
      response.forEach((element: any) =>{

        if(element.department_id == this.direccion.region){

          this.provincias.push(

            element
          )


        }
    
  });

  console.log(this.provincias);
    
  }


  );

}

select_provincia(){

  this.comunas = [];
  $('#sl-comuna').prop('disabled', false);
  this._guestService.get_comunas().subscribe(
    response=>{
      
      response.forEach((element: any) =>{

        if(element.province_id == this.direccion.provincia){

          this.comunas.push(

            element
          )


        }
    
  });

  console.log(this.comunas);
    
  }


  );
}

}


