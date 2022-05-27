import { NgModule } from '@angular/core';

import { InmuebleRoutingModule } from './inmueble-routing.module';
import { BorrarInmuebleComponent } from './components/borrar-producto/borrar-producto.component';
import { ListarInmuebleComponent } from './components/listar-producto/listar-producto.component';
import { CrearInmuebleComponent } from './components/crear-producto/crear-producto.component';
import { InmuebleComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { InmuebleService } from './shared/service/inmueble.service';
import { ListarInmuebleSoloComponent } from './components/listar-inmueble-solo/listar-inmueble-solo.component';


@NgModule({
  declarations: [
    CrearInmuebleComponent,
    ListarInmuebleComponent,
    BorrarInmuebleComponent,
    InmuebleComponent,
    ListarInmuebleSoloComponent
  ],
  imports: [
    InmuebleRoutingModule,
    SharedModule
  ],
  providers: [InmuebleService]
})
export class InmuebleModule { }
