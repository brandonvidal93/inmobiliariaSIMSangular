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
  price: number;
  priceDiscount: number;

  // , private router: Router
  constructor(protected productoServices: ProductoService) {
    this.price = 0;
    this.priceDiscount = 0;
  }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear() {
    console.log(this.productoForm.value);
    
    // this.productoServices.guardar(this.productoForm.value).subscribe(() => {
    //   // Mostrar el mensaje de éxito
    //   alert('Producto creado con éxito');

    //   // Redireccionar a la lista de productos
    //   this.router.navigateByUrl('/buildings/listar');
    // });
  }

  handleChangePrice(event) {
    this.price = event.target.value;
    
    console.log(this.price);
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
      rooms           : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      office          : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      bathrooms       : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      garages         : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      floors          : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      price           : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      priceDiscount   : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      priceAdmon      : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      pricePolicy     : new FormControl('', [Validators.required, Validators.pattern(numberRegEx)]),
      imgCover        : new FormControl('', [Validators.required]),
      descripcion     : new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }
}
