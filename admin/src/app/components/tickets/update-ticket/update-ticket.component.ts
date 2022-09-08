import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
declare var iziToast:any;

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  public token: any;
  public ticket: any = {
    tipo: ''
  };
  public load_btn = false;
  public id:any;
  public load_data = true;
  
  constructor(
    private _ticketService: TicketService,
    private _router: Router,
    private _route: ActivatedRoute
    
      ) {
        this.token = localStorage.getItem('token')
    
       }
    

  ngOnInit(): void {
    this._route.params.subscribe(

      params =>{
        this.id = params['id'];
        console.log(this.id);

        this._ticketService.obtener_ticket_admin(this.id, this.token).subscribe(

          response=>{
            if(response.data == undefined){
              this.ticket = undefined;
              this.load_data = false;


            }else{

              this.ticket = response.data;
              this.load_data = false;

            }
            console.log(this.ticket);

          }
        
        )


      }
          )

      }
 
  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.load_btn = true;
      this._ticketService.actualizar_ticket_admin(this.id,this.ticket,this.token).subscribe(

        response=>{
          
          iziToast.show({
            title: 'Success',
            titleColor: 'green',
            class: 'text-success',
            position: 'topLeft',
            message: 'se actualizó correctamente el ticket',
            messageColor: 'blue'
          })
          
          this.load_btn = false;

          this._router.navigate(['/panel/tickets']);


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
