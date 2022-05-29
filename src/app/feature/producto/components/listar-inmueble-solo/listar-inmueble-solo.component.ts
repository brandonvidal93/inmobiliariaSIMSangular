import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inmueble } from '@producto/shared/model/inmueble';
import { InmuebleService } from '@producto/shared/service/inmueble.service';
import { dataType, dataAntique, dataUbication } from '../../shared/utils/dataSelect';
import { Router } from '@angular/router';

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
  ubicationId: string;
  ubicationDiscount: number;
  ubicationName: string;
  isApartment: boolean;

  price: number;
  priceDiscount: number;
  priceAdmon: number;
  pricePolicy: number;
  antiqueId: number;

  dataType: { id: number; name: string }[];
  dataAntique: { id: number; name: string }[];
  dataUbication: { id: number; name: string; discount: number }[];

  isLoading: boolean;
  isEdit: boolean;

  inmuebleSoloForm: FormGroup;

  constructor(private aRoute: ActivatedRoute, protected inmuebleServices: InmuebleService, private formBuilder: FormBuilder, private router: Router) {
    this.id = parseInt(this.aRoute.snapshot.paramMap.get('id'));
    this.tipoInmueble = '';
    this.antiguedad = '';
    this.sector = '';
    this.price = 0;
    this.priceDiscount = 0;
    this.priceAdmon = 0;
    this.pricePolicy = 0;
    this.isApartment = false;
    this.ubicationId = '';
    this.ubicationDiscount = 0;
    this.ubicationName = '';
    this.antiqueId= 0;

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

  handleTypeBuilding(event) {
    if (event.target.value === '1') {
      this.isApartment = true;
    } else {
      this.isApartment = false;
    }

    this.updatePrices();
  }

  handleChangeAntique(event) {
    this.antiqueId = parseInt(event.target.value);

    this.updatePrices();
  }

  handleUbication(event) {
    let ubicationInfo: string = event.target.value.split('_');
    
    this.ubicationId = ubicationInfo[0];
    this.ubicationDiscount = parseFloat(ubicationInfo[1]);
    this.ubicationName = ubicationInfo[2];
    
    this.updatePrices();
  } 

  handleChangePrice(event) {
    this.price = parseInt(event.target.value);

    this.updatePrices();
  }

  updatePrices() {
    // Descuento segun el sector
    this.priceDiscount = this.price - (this.price * this.ubicationDiscount);

    // Administración si es aparmento
    if (this.isApartment) {
      this.priceAdmon = this.priceDiscount * 0.001;
    } else {
      this.priceAdmon = 0;
    }

    // Seguro por antiguedad
    if (this.antiqueId >= 2) {
      this.pricePolicy = this.priceDiscount * 0.05;
    } else {
      this.pricePolicy = 0;
    }
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

      this.price = this.inmueble.price;
      this.priceDiscount = this.inmueble.priceDiscount;
      this.priceAdmon = this.inmueble.priceAdmon;
      this.pricePolicy = this.inmueble.pricePolicy;
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

    if (this.isEdit === false) {
      this.getInmuebleSolo();
    }
  }

  guardar() {
    this.inmuebleSoloForm.value.id = this.id;
    this.inmuebleSoloForm.value.ubication = {
      id: this.ubicationId,
      discount: this.ubicationDiscount,
      name: this.ubicationName
    };
    this.inmuebleSoloForm.value.priceDiscount = this.priceDiscount;
    this.inmuebleSoloForm.value.priceAdmon = this.priceAdmon;
    this.inmuebleSoloForm.value.pricePolicy = this.pricePolicy;

    console.log(this.inmuebleSoloForm.value);
    
    
    this.inmuebleServices.actualizar(this.inmuebleSoloForm.value).subscribe(() => {
      // Mostrar el mensaje de éxito
      alert('Inmueble actualizado con éxito');

      // Redireccionar a la lista de productos
      this.router.navigateByUrl('/buildings/listar');
    });
  }

}
