import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { GLOBAL} from './GLOBAL';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

public url: any;

  constructor(
    private  _http: HttpClient,

  ) 
  
  {
    
    
    this.url = GLOBAL.url;

   }

   login_admin(data:any): Observable<any>{

    let headers = new HttpHeaders().set('content-Type', 'application/json');

    return this._http.post(this.url + 'login_admin', data, {headers:headers});

   }
   
   getToken(){

    return localStorage.getItem('token')

   }
   public isAuthenticated(allowRoles: string[]): boolean{
   
    const token = localStorage.getItem('token')
   

    if(!token){

      return false

    }

    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);
   
   console.log(decodedToken);
   
   if(!decodedToken){
      console.log('no es válido');
      localStorage.removeItem('token');
      return false;


    }
    
    return allowRoles.includes(decodedToken['role']);
   }
 
  }
