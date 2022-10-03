import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client';
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast:any;
declare var Cleave:any;
declare var StickySidebar:any;
declare var paypal:any;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @ViewChild('paypalButton', { static: true })
  paypalElement!: ElementRef
  public idcliente: any;
  public token: any;
  public carrito_arr: Array<any> = [];
  public url:any;
  public subtotal:any = 0;
  public total_pagar: any = 0;
  public socket = io('http://localhost:4201');
  public direccion_principal:any = {};
  public envios: Array<any> = [];
  public precio_envio = "0";
  public venta:any = {};
  public dventa:Array<any> = [];

  

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService

  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this.idcliente = localStorage.getItem('_id');
    this.venta.cliente = this.idcliente;
    
    

   
  this._guestService.get_envios().subscribe(

    response=>{
      console.log(response);
      this.envios = response;

    }
  );
  }

  ngOnInit(): void {
    this.init_Data();
    
  
  setTimeout(() => {
    
    new Cleave('#cc-number', {
      creditCard: true,
      onCreditCardTypeChanged: function (type:any) {
          // update UI ...
      }
  });

  new Cleave('#cc-exp-date', {
    date: true,
    datePattern: ['m', 'y']
});
  
var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
  

});


this.get_direccion_principal();

paypal.Buttons({
  style: {
      layout: 'horizontal'
  },
  createOrder: (data:any,actions:any)=>{

      return actions.order.create({
        purchase_units : [{
          description : 'Nombre del pago',
          amount : {
            currency_code : 'USD',
            value: 999
          },
        }]
      });
    
  },
  onApprove : async (data:any,actions:any)=>{
    const order = await actions.order.capture();
    console.log(order);
    
    
    this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;
    console.log(this.venta);

    
  },
  onError : (err: any) =>{
   
  },
  onCancel: function (data:any, actions:any) {
    
  }
}).render(this.paypalElement.nativeElement);


}

init_Data(){
  this._clienteService.obtener_carrito_cliente(this.idcliente,this.token).subscribe(
    response=>{
      this.carrito_arr = response.data;

      this.carrito_arr.forEach(element => {
          this.dventa.push({
            producto: element.producto._id,
            subtotal: element.producto.precio,
            variedad: element.variedad,
            cantidad: element.cantidad,
            cliente: localStorage.getItem('_id')
          });
      });
     

      this.subtotal = 0;
      this.calcular_carrito();
      this.calcular_total('envío gratis');
    }
  );
}
 get_direccion_principal(){

  this._clienteService.obtener_direccion_principal_cliente(localStorage.getItem('_id'),this.token).subscribe(

    response=>{
      if(response.data == undefined){
        this.direccion_principal = undefined;


      }else{
        this.direccion_principal = response.data;
        this.venta.direccion = this.direccion_principal._id;
      }
      
      

    }
  );
 }


calcular_carrito(){
    this.subtotal = 0;
    this.carrito_arr.forEach(element =>{
      this.subtotal = this.subtotal + parseInt (element.producto.precio);
  });
  
  this.total_pagar = this.subtotal;

}

eliminar_item(id:any){

  this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(

    response=>{
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position: 'topRight',
        message: 'Se eliminó el producto correctamente.'
    });
      
      this.socket.emit('delete-carrito', {data: response.data})
      this._clienteService.obtener_carrito_cliente(this.idcliente, this.token).subscribe(

        response=>{
          this.carrito_arr = response.data;
          this.calcular_carrito();
          
        }
      )

    }
  );

}

calcular_total(envio_titulo:any){

  this.total_pagar = parseInt(this.subtotal.toString()) + parseInt(this.precio_envio)
  this.venta.subtotal = this.total_pagar;
  this.venta.envio_precio = parseInt (this.precio_envio);
  this.venta.envio_titulo = envio_titulo;

  console.log(this.venta);
}

}

