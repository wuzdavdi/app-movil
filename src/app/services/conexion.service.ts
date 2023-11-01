import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject, pipe, tap } from 'rxjs';
import { Datos } from '../datos/models/datos';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private _refresh$ = new Subject<void>()
  get refresh$(){
    return this._refresh$
  }
  url = "https://david2828.000webhostapp.com/2myapp2" //Dirección de backend
  constructor(private http:HttpClient) { }

  consultaDatos():Observable<any>{
    return this.http
    .get(this.url+'/consultaDatos')
  }

  insertarDatos(datos:any){
    return this.http
    .post(this.url+"/insertarDatos", JSON.stringify(datos))
  }

  removeDatos(datId:any){
    return this.http
    .post(this.url+"/removeDatos",JSON.stringify(datId))
    .pipe(tap(()=>{
      this._refresh$.next
    }))
  }
  
  updateDatos(datos:any){
    return this.http
    .post(this.url+"/updateDatos",JSON.stringify(datos))
    .pipe(tap(()=>{
      this._refresh$.next
    }))
  }


}



