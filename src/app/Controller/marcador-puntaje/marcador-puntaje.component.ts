import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RegistroEquipoService } from 'src/app/Shared/registro-equipo.service';
import { Equipo } from 'src/app/Models/equipo.model';
import { PuntuacionEquipoService } from 'src/app/Shared/puntuacion-equipo.service';
import { PuntajeEquipo } from 'src/app/Models/puntaje-equipo.model';


@Component({
  selector: 'app-marcador-puntaje',
  templateUrl: './marcador-puntaje.component.html',
  styleUrls: ['./marcador-puntaje.component.css']
})
export class MarcadorPuntajeComponent  implements  OnInit  {
  equipo1: Equipo;
  equipo2: Equipo;

  puntajeEquipoModel = new PuntajeEquipo();
  existeGanador: boolean = false;

  @Input()
  existeEquiposParaIniciarPartido: number;

  
  @Output()  
  habilitarRegistroEquipo: EventEmitter<number> = new EventEmitter<number>();
  
  

  constructor(private regitroEquipoService: RegistroEquipoService,
              private puntuacionEquipoService: PuntuacionEquipoService) {
      this.equipo1 = new Equipo();
      this.equipo2 = new Equipo();
                   
  }


  ngOnInit(){
    this.obtenerEquipos();

  }
  

  obtenerEquipoInfo(equipoId: number){
    if(this.equipo1.equipoId!=null && this.equipo2.equipoId!=null){
      this.regitroEquipoService.obtenerEquipoInfo(equipoId).subscribe(
          data =>{
              var equipo = new Equipo();
              equipo = <Equipo> data;
              if( equipo != null && this.equipo1.equipoId == equipo.equipoId) 
                {
                   this.equipo1 = equipo;
                }

              if( equipo != null && this.equipo2.equipoId == equipo.equipoId ) 
              {
                this.equipo2 = equipo;
              }
          },
          error =>{

        });
    }
  }


  
  obtenerEquipos(){
    var contadorEquipos = 0;
    
    this.regitroEquipoService.obtenerEquipos().subscribe(
       data =>{
           var equipos = new Equipo();
           equipos = <Equipo> data;
           
           for (const equipo in equipos) {
             contadorEquipos = contadorEquipos +1;
             
             if (equipos.hasOwnProperty(equipo)) {
               const element = equipos[equipo];
  
               if(contadorEquipos == 1) this.equipo1 = <Equipo>element;
               
               if( contadorEquipos == 2 ) this.equipo2 = <Equipo>element;
              
             }
           }        
       },
       error =>{
 
       });
    }
 

  procesarPartido(equipoID: number, puntaje: number){
    if (!this.existeGanador && equipoID!=null){
      
      this.verificarGanador(this.equipo1.equipoId, this.equipo2.equipoId);
      this.sumarPuntaje(equipoID);
      this.llenarPuntajeEquipoModel(equipoID, puntaje);
      this.actualizarPuntaje();      
    }
  }

  sumarPuntaje(equipoID: number)
  {
     if (equipoID == this.equipo1.equipoId )
       this.equipo1.puntajeActual = this.equipo1.puntajeActual + 1;
     

     if (equipoID == this.equipo2.equipoId )
       this.equipo2.puntajeActual = this.equipo2.puntajeActual + 1;    
    

  }

  llenarPuntajeEquipoModel(equipoID:number, puntaje: number){
     this.puntajeEquipoModel.equipoId = equipoID;
     this.puntajeEquipoModel.puntaje = puntaje;
  }

  actualizarPuntaje(){
     this.puntuacionEquipoService.actualizar(this.puntajeEquipoModel).subscribe(
      response =>{
           if(this.puntajeEquipoModel.equipoId!=null)  this.obtenerEquipoInfo(this.puntajeEquipoModel.equipoId);
           //asignar valor del puntaje nuevo
      },
      error =>{

      });
  }



  verificarGanador(equipoID1:number, equipoID2: number){
    if (equipoID1!=null && equipoID2!=null){
      this.puntuacionEquipoService.obtenerGanador(equipoID1, equipoID2).subscribe(
        response =>{
          if(response!="No hay ganador"){
            alert("Equipo Ganador es:"+ response + " sistema va iniciar el partido.");
            this.existeGanador=true;

            this.iniciarEquipo(this.equipo1.equipoId);
            this.iniciarEquipo(this.equipo2.equipoId);
            this.existeEquiposParaIniciarPartido = 0;
            this.habilitarRegistroEquipo.emit(0);
          }
        },
        error =>{

        });
      }
    }

    iniciarEquipo(equipoId: number){
      this.llenarPuntajeEquipoModel(equipoId,0);
      this.actualizarPuntaje();
      this.eliminarEquipo(equipoId);
    }

    eliminarEquipo(equipoId: number){
      this.puntuacionEquipoService.eliminar(equipoId).subscribe(
        response =>{
           this.regitroEquipoService.eliminar(equipoId).subscribe(
             responseRegistro =>{

              console.log("equipo eliminado...");
             },
             errorRegistro => {

             })
        },
        error =>{
  
        });
    }
}
