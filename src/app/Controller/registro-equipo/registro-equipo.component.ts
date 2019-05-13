import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipo } from 'src/app/Models/equipo.model';
import { RegistroEquipoService } from 'src/app/Shared/registro-equipo.service';
import { PuntuacionEquipoService } from 'src/app/Shared/puntuacion-equipo.service';
import { PuntajeEquipo } from 'src/app/Models/puntaje-equipo.model';

@Component({
  selector: 'app-registro-equipo',
  templateUrl: './registro-equipo.component.html',
  styleUrls: ['./registro-equipo.component.css']
})


export class RegistroEquipoComponent implements OnInit {

  equipo1 =  new Equipo;
  equipo2 = new Equipo;

  puntajeEquipoModel: PuntajeEquipo;

  @Output()  
  existeEquiposParaIniciarPartido: EventEmitter<number> = new EventEmitter<number>();
  
  
  @Input()  
  habilitarPantalla: boolean;

  constructor(private regitroEquipoService:RegistroEquipoService,
              private puntuacionEquipoService: PuntuacionEquipoService
    ) {
    this.verificarEquipos();
  }

  ngOnInit() {
  }

  verificarEquipos(){
      this.regitroEquipoService.existeEquiposParaIniciarPartido().subscribe(
        result =>{
          this.existeEquiposParaIniciarPartido.emit( Number(result) >=1 ? 1: 0);
          if(Number(result)>=1){
            this.habilitarPantalla=true;
          }else{
            this.habilitarPantalla=false;
          }
        },
        error =>{

        });

  }

  registrarEquipo(equipo: Equipo){
    var equipoRegistrado = new Equipo;
    this.regitroEquipoService.insertar(equipo).subscribe(
        data => {
          equipoRegistrado = <Equipo> data;
          this.llenarPuntajeEquipoModel(equipoRegistrado.equipoId);
          this.registrarPuntuacionEquipo();
        },
        err => {
          console.log('Error registro equipo1');
        });
        
  }

  llenarPuntajeEquipoModel(equipoId: number){
    this.puntajeEquipoModel = new PuntajeEquipo;
    this.puntajeEquipoModel.equipoId=equipoId;
    this.puntajeEquipoModel.puntaje = 0;
  }

  registrarPuntuacionEquipo(){
    this.puntuacionEquipoService.insertar(this.puntajeEquipoModel).subscribe(
      response =>{
           this.verificarEquipos();
      },
      error =>{
         console.log('error registrar puntuacion');
      }
    );

  }

  iniciarJuego(){
    this.registrarEquipo(this.equipo1);
    this.registrarEquipo(this.equipo2);
    
  }
}