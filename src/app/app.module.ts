import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistroEquipoComponent } from './Controller/registro-equipo/registro-equipo.component';
import { MarcadorPuntajeComponent } from './Controller/marcador-puntaje/marcador-puntaje.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroEquipoService } from './Shared/registro-equipo.service';
import { PuntuacionEquipoService } from './Shared/puntuacion-equipo.service';
import { Configuration } from './Constant/configuration';


@NgModule({
  declarations: [
    AppComponent,
    RegistroEquipoComponent,
    MarcadorPuntajeComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegistroEquipoService, 
              PuntuacionEquipoService,
              Configuration
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
