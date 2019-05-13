import { Component, ViewChild } from '@angular/core';
import { MarcadorPuntajeComponent } from './Controller/marcador-puntaje/marcador-puntaje.component';
import { RegistroEquipoComponent } from './Controller/registro-equipo/registro-equipo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientVeleibolApp';
  existeEquipos : number;
  
  @ViewChild('marcadorPuntaje') marcadorPuntaje: MarcadorPuntajeComponent;
  @ViewChild('registroEquipo') registroEquipo: RegistroEquipoComponent;
  


  actualizarExisteEquipos(existeEquipos:number){
     this.existeEquipos= existeEquipos;
     this.marcadorPuntaje.ngOnInit();
  }

  habilitarPantallaRegistroEquipo(habilitar: number){
     this.existeEquipos = habilitar;
     this.registroEquipo.ngOnInit();
  }
}
