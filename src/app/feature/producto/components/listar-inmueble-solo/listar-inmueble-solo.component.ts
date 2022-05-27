import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmueble } from '@producto/shared/model/inmueble';
import { InmuebleService } from '@producto/shared/service/inmueble.service';

@Component({
  selector: 'app-listar-inmueble-solo',
  templateUrl: './listar-inmueble-solo.component.html',
  styleUrls: ['./listar-inmueble-solo.component.scss']
})
export class ListarInmuebleSoloComponent implements OnInit {
  inmueble: Inmueble[];

  constructor(private aRoute: ActivatedRoute, private inmuebleServices: InmuebleService) { }

  ngOnInit(): void {
  }

}
