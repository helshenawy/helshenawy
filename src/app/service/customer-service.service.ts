import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  
  constructor(private http: HttpClient) { }


    getHello(): Observable<any> {
      return  this.http.get(AUTH_API+'hello', { 'headers': headers, responseType: 'text'  } );
      }

      getcustomers(): Observable<any> {
        return  this.http.get(AUTH_API+'customers', { 'headers': headers, responseType: 'json'  } );
        }

      
        findByphone(phone:any): Observable<any> {
          return  this.http.get(AUTH_API+'findByphone/${encodeURIComponent(phone)}', { 'headers': headers, responseType: 'json'  } );
          }





}
