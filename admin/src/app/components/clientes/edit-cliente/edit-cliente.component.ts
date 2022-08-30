import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente:any = {};
  public id:any;
  public token: any;
  public load_btn = false;
  public load_data = true;
  
  constructor(

  private _route: ActivatedRoute,
  private clienteService: ClienteService,
  private adminService: AdminService,
  private _router: Router
  ) {

   this.token = this.adminService.getToken();
  }

  ngOnInit(): void {

    this._route.params.subscribe(

      params =>{
        this.id = params['id'];
        
        this.clienteService.obtener_cliente_admin(this.id,this.token ).subscribe(

          response=>{
            console.log(response);
            if(response.data == undefined){
              this.cliente = undefined;
              this.load_data = false;


            }else{

              this.cliente = response.data;
              this.load_data = false;
            }

          },

          error=>{
            

          }
        
        )

      }

    )
  }

  actualizar(updateForm:any){
    if(updateForm.valid){
      this.load_btn = true;
      this.clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(

        response=>{
          iziToast.show({
            title: 'Success',
            titleColor: 'green',
            class: 'text-success',
            position: 'topLeft',
            message: 'Cliente actualizado correctamente',
            messageColor: 'blue'
          })

          this.load_btn = false;
          this._router.navigate(['/panel/clientes'])

        }, error=>{
          console.log(error)
      

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
