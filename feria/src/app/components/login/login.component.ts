import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public token: any;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router

  ) { }

  ngOnInit(): void {
  }

  login(loginForm:any){

    if(loginForm.valid){

      let data = {

        email: this.user.email,
        password: this.user.password
 
       }
       this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'Error',
              titleColor: 'red',
              class: 'text-danger',
              position: 'topLeft',
              message: response.message,
              messageColor: 'blue'
            });


          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this._router.navigate(['/']);

          }

        },
      
      error=>{
        console.log(error);

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
}

  

    
  
