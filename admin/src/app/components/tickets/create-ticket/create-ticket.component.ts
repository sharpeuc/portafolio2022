import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  public token: any;
  public ticket: any = {
    tipo: ''
  };
  public load_btn = false;

  constructor(
private _ticketService: TicketService,
private _router: Router

  ) {
    this.token = localStorage.getItem('token')

   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
  
    if(registroForm.valid){
      this.load_btn = true;
      this._ticketService.registro_ticket_admin(this.ticket,this.token).subscribe(

        response=>{
          iziToast.show({
            title: 'Success',
            titleColor: 'green',
            class: 'text-success',
            position: 'topLeft',
            message: 'se registró correctamente el nuevo ticket',
            messageColor: 'blue'
          })

          this.load_btn = false;
          this._router.navigate(['/panel/tickets']);
          
          

        },
        error=>{
          console.log(error);
          this.load_btn = false;


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
