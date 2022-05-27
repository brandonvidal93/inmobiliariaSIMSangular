import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inmueble } from '@producto/shared/model/inmueble';
import { InmuebleService } from '@producto/shared/service/inmueble.service';
import { dataType, dataAntique, dataUbication } from '../../shared/utils/dataSelect';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 500;

@Component({
  selector: 'app-listar-inmueble-solo',
  templateUrl: './listar-inmueble-solo.component.html',
  styleUrls: ['./listar-inmueble-solo.component.scss']
})
export class ListarInmuebleSoloComponent implements OnInit {
  public inmueble: Inmueble;
  id: number;
  tipoInmueble: string;
  antiguedad: string;
  sector: string;

  dataType: { id: number; name: string }[];
  dataAntique: { id: number; name: string }[];
  dataUbication: { id: number; name: string; discount: number }[];

  isLoading: boolean;
  isEdit: boolean;

  inmuebleSoloForm: FormGroup;

  constructor(private aRoute: ActivatedRoute, protected inmuebleServices: InmuebleService, private formBuilder: FormBuilder) {
    this.id = parseInt(this.aRoute.snapshot.paramMap.get('id'));
    this.tipoInmueble = '';
    this.antiguedad = '';
    this.sector = '';

    this.dataType = dataType;
    this.dataAntique = dataAntique;
    this.dataUbication = dataUbication;

    this.isLoading = true;
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.getInmuebleSolo();
    this.construirFormularioInmuebleSolo();
  }

  private getInmuebleSolo() {
    this.inmuebleServices.consultarInmueble(this.id).subscribe(data => {
      this.inmueble = data;

      this.dataType.forEach(type => {
        if(parseInt(this.inmueble.type) === type.id) {
          this.tipoInmueble = type.name;
        }
      });

      this.dataAntique.forEach(antique => {
        if(parseInt(this.inmueble.antiqueId) === antique.id) {
          this.antiguedad = antique.name;
        }
      });

      this.dataUbication.forEach(ubication => {
        if(parseInt(this.inmueble.ubication.id) === ubication.id) {
          this.sector = ubication.name;
        }
      });
    });
  }

  private construirFormularioInmuebleSolo() {
    this.inmuebleSoloForm = this.formBuilder.group({
      type            : ['', [Validators.required]],
      totalArea       : ['', [Validators.required]],
      builtArea       : ['', [Validators.required]],
      antiqueId       : ['', Validators.required],
      levelId         : ['', [Validators.required]],
      ubication       : ['', Validators.required],
      address         : ['', Validators.required],
      rooms           : ['', [Validators.required]],
      office          : [''],
      bathrooms       : ['', [Validators.required]],
      garages         : [''],
      floors          : ['', [Validators.required]],
      price           : ['', [Validators.required]],
      priceDiscount   : [''],
      priceAdmon      : [''],
      pricePolicy     : [''],
      imgCover        : ['', Validators.required],
      descripcion     : ['', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]]
    });
  }

  habilitarEdicion() {
    this.isEdit = !this.isEdit;
  }

}
