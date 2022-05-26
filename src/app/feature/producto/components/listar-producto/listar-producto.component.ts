import { Component, OnInit } from '@angular/core';

import { InmuebleService } from '@producto/shared/service/inmueble.service';
import { Inmueble } from '@producto/shared/model/inmueble';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarInmuebleComponent implements OnInit {
  public listaProductos: Inmueble[];

  constructor(protected productoService: InmuebleService) { }

  listarInmuebles() {
    this.productoService.consultarInmuebles().subscribe(data => {
      this.listaProductos = data;
      console.log(this.listaProductos);
    });
  }

  ngOnInit() {
    this.listarInmuebles();
  }
}
