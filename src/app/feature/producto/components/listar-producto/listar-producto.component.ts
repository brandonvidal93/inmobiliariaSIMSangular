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

  isLoading: boolean;

  constructor(protected inmuebleService: InmuebleService) {
    this.isLoading = true;
  }

  listarInmuebles() {
    this.inmuebleService.consultarInmuebles().subscribe(data => {
      this.isLoading = false;

      this.listaProductos = data;
    });
  }

  ngOnInit() {
    this.listarInmuebles();
  }
}
