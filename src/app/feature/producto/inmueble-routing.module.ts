import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearInmuebleComponent } from './components/crear-producto/crear-producto.component';
import { ListarInmuebleComponent } from './components/listar-producto/listar-producto.component';
import { BorrarInmuebleComponent } from './components/borrar-producto/borrar-producto.component';
import { InmuebleComponent } from './components/producto/producto.component';


const routes: Routes = [
  {
    path: '',
    component: InmuebleComponent,
    children: [
      {
        path: 'crear',
        component: CrearInmuebleComponent
      },
      {
        path: 'listar',
        component: ListarInmuebleComponent
      },
      {
        path: 'borrar',
        component: BorrarInmuebleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
