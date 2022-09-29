import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
declare var jquery: any;
declare var $:any;
declare var iziToast:any;

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
    comuna: '',
    principal: false
  };

  public direcciones: Array<any> = [];
  
  public regiones: Array<any> = [];
  public provincias: Array<any> = [];
  public comunas: Array<any> = [];


  public regiones_arr: Array<any> = [];
  public provincias_arr: Array<any> = [];
  public comunas_arr: Array<any> = [];

  public load_data = true;


  constructor(
  
  private _guestService: GuestService,
  private _clienteService: ClienteService

  ) { 
    this.token = localStorage.getItem('token');

    this._guestService.get_regiones().subscribe(
      response=>{
        this.regiones_arr = response;
      }
    );

  
    this._guestService.get_provincias().subscribe(
      response=>{
        this.provincias_arr = response;
      }
    );
  
  
    this._guestService.get_comunas().subscribe(
      response=>{
        this.comunas_arr = response;
      }
    );
  
  }

  
  

  ngOnInit(): void {
  this.obtener_direccion();
  
  }

  obtener_direccion(){
    this._clienteService.obtener_direccion_todos_cliente(localStorage.getItem('_id'),this.token).subscribe(

      response=>{
        this.direcciones = response.data;
        this.load_data = false;

      }
    );


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
  $('#sl-comuna').prop('disabled', true);
  this.direccion.provincia = '';
  this.direccion.comuna = '';
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
  this.direccion.comuna = '';
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

registrar(registroForm:any){

if(registroForm.valid){

  this.regiones_arr.forEach(element=> {
    if(parseInt (element.id) == parseInt (this.direccion.region)){
      this.direccion.region = element.name;

  }
  
  });

  this.provincias_arr.forEach(element=> {
    if(parseInt (element.id) == parseInt (this.direccion.provincia)){
      this.direccion.provincia = element.name;

  }
  
  });


  this.comunas_arr.forEach(element=> {
    if(parseInt (element.id) == parseInt (this.direccion.comuna)){
      this.direccion.comuna = element.name;

  }
  
  });

  let data = {

    destinatario:this.direccion.destinatario,
    rut:this.direccion.rut,
    zip:this.direccion.zip,
    direccion:this.direccion.direccion,
    telefono:this.direccion.telefono,
    pais:this.direccion.pais,
    region:this.direccion.region,
    provincia:this.direccion.provincia,
    comuna:this.direccion.comuna,
    principal:this.direccion.principal,
    cliente: localStorage.getItem('_id')
  }

  this._clienteService.registro_direccion_cliente(data, this.token).subscribe(

    response=>{

      this.direccion = {

        pais: '',
        region: '',
        provincia: '',
        comuna: '',
        principal: false
      };
      $('#sl-region').prop('disabled', true);
      $('#sl-provincia').prop('disabled', true);
      $('#sl-comuna').prop('disabled', true);

      iziToast.show({
        title: 'Success',
        titleColor: 'green',
        class: 'text-success',
        position: 'topLeft',
        message: 'Dirección agregada correctamente',
        messageColor: 'blue'
      });

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
  })
}

}


establecer_principal(id:any){

  this._clienteService.cambiar_direccion_principal_cliente(id,localStorage.getItem('_id'),this.token).subscribe(

    response=>{
      iziToast.show({
        title: 'Success',
        titleColor: 'green',
        class: 'text-success',
        position: 'topLeft',
        message: 'Dirección principal actualizada',
        messageColor: 'blue'
      });
      this.obtener_direccion();
      
    }
  );


}
}


