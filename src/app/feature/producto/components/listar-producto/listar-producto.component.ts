import { Component, OnInit } from '@angular/core';

import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Producto[];

  constructor(protected productoService: ProductoService) { }

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
