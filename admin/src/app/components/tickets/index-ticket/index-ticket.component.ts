import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
declare var iziToast: any;
declare var jquery: any;
declare var $:any;

@Component({
  selector: 'app-index-ticket',
  templateUrl: './index-ticket.component.html',
  styleUrls: ['./index-ticket.component.css']
})
export class IndexTicketComponent implements OnInit {

  public tickets : Array<any> = [];
  public load_data = true;
  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public token: any;

  constructor(
private _ticketService : TicketService

  ) { 
this.token = localStorage.getItem('token');

  }

  ngOnInit(): void {
  this._ticketService.listar_ticket_admin(this.filtro,this.token).subscribe(

    response=>{
      this.tickets = response.data;
      this.load_data = false;


    },
    error=>{
      console.log(error);


    }
  )
  
  }

  filtrar(){
    this._ticketService.listar_ticket_admin(this.filtro,this.token).subscribe(

      response=>{
        this.tickets = response.data;
        this.load_data = false;
  }
    )
}
eliminar(id:any){
  this._ticketService.eliminar_ticket_admin(id, this.token).subscribe(

    response=>{
      iziToast.show({
        title: 'Success',
        titleColor: 'green',
        class: 'text-success',
        position: 'topLeft',
        message: 'Ticket eliminado correctamente',
        messageColor: 'blue'
      })

      $('#delete-' + id).modal('hide');
      $('.modal-backdrop').removeClass('show');
    
      this._ticketService.listar_ticket_admin(this.filtro,this.token).subscribe(

        response=>{
          this.tickets = response.data;
          this.load_data = false;
    
    
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

}

}
