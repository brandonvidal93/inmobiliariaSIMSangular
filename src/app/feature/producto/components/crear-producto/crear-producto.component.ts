import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 500;
const numberRegEx = /\-?\d*\.?\d{1,2}/;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  ubication: string;
  price: number;
  priceDiscount: number;
  priceAdmon: number;
  pricePolicy: number;
  isApartment: boolean;

  // , private router: Router
  constructor(protected productoServices: ProductoService) {
    this.ubication = '';
    this.price = 0;
    this.priceDiscount = 0;
    this.priceAdmon = 0;
    this.pricePolicy = 0;
    this.isApartment = false;
  }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  handleUbication(event) {
    this.ubication = event.target.value;
  } 

  handleTypeBuilding(event) {
    if (event.target.value === '1') {
      this.isApartment = true;
    } else {
      this.isApartment = false;
    }
  }

  handleChangePrice(event) {
    this.price = parseInt(event.target.value);

    // Segun el sector
    
    this.priceDiscount = this.price - (this.price * 0.1);

    // Si es aparmento
    if (this.isApartment) {
      this.priceAdmon = this.priceDiscount - (this.priceDiscount * 0.999);
    } else {
      this.priceAdmon = 0;
    }

    // Por antiguedad
    this.pricePolicy = this.priceDiscount - (this.priceDiscount * 0.99);
  }

  crear() {
    this.productoForm.value.priceDiscount = this.priceDiscount;
    this.productoForm.value.priceAdmon = this.priceAdmon;
    this.productoForm.value.pricePolicy = this.pricePolicy;



    console.log(this.productoForm.value);
    
    // this.productoServices.guardar(this.productoForm.value).subscribe(() => {
    //   // Mostrar el mensaje de éxito
    //   alert('Producto creado con éxito');

    //   // Redireccionar a la lista de productos
    //   this.router.navigateByUrl('/buildings/listar');
    // });
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      id              : new FormControl('', [Validators.required]),
      type            : new FormControl('', [Validators.required]),
      totalArea       : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      builtArea       : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      antique         : new FormControl('', [Validators.required]),
      levelId         : new FormControl('', [Validators.required]),
      ubication       : new FormControl('', [Validators.required]),
      address         : new FormControl('', [Validators.required]),
      rooms           : new FormControl('', [Validators.required]),
      office          : new FormControl('', [Validators.required]),
      bathrooms       : new FormControl('', [Validators.required]),
      garages         : new FormControl('', [Validators.required]),
      floors          : new FormControl('', [Validators.required]),
      price           : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      priceDiscount   : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      priceAdmon      : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      pricePolicy     : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      imgCover        : new FormControl('', [Validators.required]),
      descripcion     : new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }
}
