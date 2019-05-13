import { Injectable } from '@angular/core';
import { Equipo } from '../Models/equipo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../Constant/configuration';


@Injectable()
export class RegistroEquipoService {
  private actionURL : string;
  
  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionURL = configuration.serverWithApiUrl+"equipo/"; 
    console.log(this.actionURL);
  }

  insertar<Equipo>(equipo: Equipo): Observable<Equipo> {
       return this.http.post<Equipo>(this.actionURL+"insertar", equipo);  
  }

  existeEquiposParaIniciarPartido<T>(): Observable<T> {
    return this.http.get<T>(this.actionURL+"existeEquiposParaIniciarPartido");
  }

  obtenerEquipoInfo<T>(equipoId:number): Observable<T> {
    return this.http.get<T>(this.actionURL+"obtenerEquipoInfo/"+equipoId);
    
  }

  eliminar<T>(equipoId: number): Observable<T> {
    return this.http.delete<T>(this.actionURL+"eliminar/" + equipoId);
  }
  
  obtenerEquipos<T>(): Observable<T>{
    return this.http.get<T>(this.actionURL+"obtenerEquipos");
  }


}
