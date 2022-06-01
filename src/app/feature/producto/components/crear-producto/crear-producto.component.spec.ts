import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearInmuebleComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InmuebleService } from '../../shared/service/inmueble.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Inmueble } from '@producto/shared/model/inmueble';

describe('CrearInmuebleComponent', () => {
  let component: CrearInmuebleComponent;
  let fixture: ComponentFixture<CrearInmuebleComponent>;
  let productoService: InmuebleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInmuebleComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [InmuebleService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInmuebleComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(InmuebleService);
    spyOn(productoService, 'guardar').and.returnValue(
      // of(true)
      of()
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.productoForm.valid).toBeFalsy();
  });

  it('Registrando producto', () => {
    expect(component.productoForm.valid).toBeFalsy();
    component.productoForm.controls.id.setValue(1);
    component.productoForm.controls.type.setValue('2');
    component.productoForm.controls.totalArea.setValue(100);
    component.productoForm.controls.builtArea.setValue(100);
    component.productoForm.controls.antiqueId.setValue('1');
    component.productoForm.controls.levelId.setValue(3);
    component.productoForm.controls.ubicationId.setValue('1');
    component.productoForm.controls.ubicationDiscount.setValue(0.10);
    component.productoForm.controls.ubicationName.setValue('1 - Popular');
    component.productoForm.controls.address.setValue('Calle 1');
    component.productoForm.controls.rooms.setValue(2);
    component.productoForm.controls.office.setValue(1);
    component.productoForm.controls.bathrooms.setValue(1);
    component.productoForm.controls.garages.setValue(1);
    component.productoForm.controls.floors.setValue(1);
    component.productoForm.controls.price.setValue(100000);
    component.productoForm.controls.priceDiscount.setValue(100000);
    component.productoForm.controls.priceAdmon.setValue(100000);
    component.productoForm.controls.pricePolicy.setValue(100000);
    component.productoForm.controls.imgCover.setValue('ruta img');
    component.productoForm.controls.descripcion.setValue('Inmueble test creación');
    expect(component.productoForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
