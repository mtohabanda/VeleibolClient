import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../Constant/configuration';
import { Observable } from 'rxjs';
import { PuntajeEquipo } from '../Models/puntaje-equipo.model';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionEquipoService {
  actionURL: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionURL = configuration.serverWithApiUrl+"puntaje/"; 
    console.log(this.actionURL);
  }
 
  insertar<T>(puntaje: PuntajeEquipo): Observable<T> {
    return this.http.post<T>(this.actionURL+"insertar", puntaje);  
  }
 
 
  actualizar<T>(puntaje: PuntajeEquipo): Observable<T> {
    return this.http.post<T>(this.actionURL+"actualizar", puntaje);  
  }

  obtenerGanador<T>(equipoId1: number, equipoId2: number): Observable<T> {
    return this.http.get<T>(this.actionURL+"obtenerGanador/"+equipoId1+"/"+equipoId2);
  }

  eliminar<T>(equipoId: number): Observable<T> {
    return this.http.delete<T>(this.actionURL+"eliminar/" + equipoId);
  }

}
