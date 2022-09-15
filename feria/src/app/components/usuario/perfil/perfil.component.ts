import { Component, OnInit } from '@angular/core';
var iziToast: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {};

  constructor() { }

  ngOnInit(): void {
  }

actualizar(actualizarForm:any){

  if(actualizarForm.valid){
    console.log(this.cliente);


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
