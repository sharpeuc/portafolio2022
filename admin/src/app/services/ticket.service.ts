import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { GLOBAL} from './GLOBAL';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public url:any;

  constructor(
    private  _http: HttpClient,

  ) {
    
    this.url = GLOBAL.url;

   }
   registro_ticket_admin(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_ticket_admin',data,{headers:headers});
  }
  
  listar_ticket_admin(filtro:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_tickets_admin/' +filtro,{headers:headers});
  }
  obtener_ticket_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_ticket_admin/' +id,{headers:headers});
  }
  actualizar_ticket_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'actualizar_ticket_admin/' +id,data,{headers:headers});
  }
  eliminar_ticket_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_ticket_admin/' +id,{headers:headers});
  }
}
