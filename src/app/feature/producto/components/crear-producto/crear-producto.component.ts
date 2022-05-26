import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { dataType, dataAntique, dataUbication } from '../../shared/utils/dataSelect';
import { Router } from '@angular/router';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 500;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  dataType: { id: number; name: string }[];
  dataAntique: { id: number; name: string }[];
  dataUbication: { id: number; name: string; discount: number }[];

  ubicationId: string;
  ubicationDiscount: number;
  ubicationName: string;
  antiqueId: number;
  price: number;
  priceDiscount: number;
  priceAdmon: number;
  pricePolicy: number;
  isApartment: boolean;

  constructor(protected productoServices: ProductoService, private formBuilder: FormBuilder, private router: Router) {
    this.dataType = dataType;
    this.dataAntique = dataAntique;
    this.dataUbication = dataUbication;

    this.ubicationId = '';
    this.ubicationDiscount = 0;
    this.ubicationName = '';
    this.antiqueId = 0;
    this.price = 0;
    this.priceDiscount = 0;
    this.priceAdmon = 0;
    this.pricePolicy = 0;
    this.isApartment = false;
  }

  ngOnInit() {
    this.construirFormularioProducto();
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
    console.log(event.target.value);
    
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

  crear() {
    this.productoForm.value.ubication = {
      id: this.ubicationId,
      discount: this.ubicationDiscount,
      name: this.ubicationName
    };
    this.productoForm.value.priceDiscount = this.priceDiscount;
    this.productoForm.value.priceAdmon = this.priceAdmon;
    this.productoForm.value.pricePolicy = this.pricePolicy;

    console.log(this.productoForm.value);
    
    
    this.productoServices.guardar(this.productoForm.value).subscribe(() => {
      // Mostrar el mensaje de éxito
      alert('Producto creado con éxito');

      // Redireccionar a la lista de productos
      this.router.navigateByUrl('/buildings/listar');
    });
  }

  private construirFormularioProducto() {
    this.productoForm = this.formBuilder.group({
      type            : ['', Validators.required],
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
}


// type            : ['', Validators.required],
//       totalArea       : ['', [Validators.required]],
//       builtArea       : ['', [Validators.required]],
//       antiqueId       : ['', Validators.required],
//       levelId         : ['', [Validators.required]],
//       ubication       : ['', Validators.required],
//       address         : ['', Validators.required],
//       rooms           : ['', [Validators.required]],
//       office          : [''],
//       bathrooms       : ['', [Validators.required]],
//       garages         : [''],
//       floors          : ['', [Validators.required]],
//       price           : ['', [Validators.required]],
//       priceDiscount   : [''],
//       priceAdmon      : [''],
//       pricePolicy     : [''],
//       imgCover        : ['', Validators.required],
//       descripcion     : ['', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]]
