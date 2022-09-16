import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;
declare var $:any;


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {};
  public id: any;
  public token: any;

  constructor(
    private _clienteService: ClienteService

  ) {

    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');

    if(this.id){

      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(

        response=>{
          this.cliente = response.data;


        }
      )


    }
   }

  ngOnInit(): void {
  }

actualizar(actualizarForm:any){
  if(actualizarForm.valid){
    this.cliente.password = $('#input_password').val();
    
    this._clienteService.actualizar_perfil_cliente_guest(this.id, this.cliente, this.token).subscribe(

      response=>{
        
        iziToast.show({
          title: 'Success',
          titleColor: 'green',
          class: 'text-success',
          position: 'topLeft',
          message: 'Perfil actualizado correctamente',
          messageColor: 'blue'
        })


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
    })
  }


}

}
