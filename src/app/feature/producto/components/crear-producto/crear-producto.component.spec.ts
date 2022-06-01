import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearInmuebleComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { InmuebleService } from '../../shared/service/inmueble.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Inmueble } from '@producto/shared/model/inmueble';

describe('CrearInmuebleComponent', () => {
  let component: CrearInmuebleComponent;
  let fixture: ComponentFixture<CrearInmuebleComponent>;
  let productoService: InmuebleService;

  // const inmueble = { id: 6, type: '1', totalArea: 200, builtArea: 200, antiqueId: '2', levelId: 3, ubicationId: '10', ubicationDiscount: 0.15, ubicationName: '10 - La Candelaria', address: 'Carrera 80B', rooms: 4, office: 2, bathrooms: 3, garages: 1, floors: 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado'}

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInmuebleComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
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
    component.productoForm.controls.type.setValue('2');
    component.productoForm.controls.totalArea.setValue(100);
    component.productoForm.controls.builtArea.setValue(100);
    component.productoForm.controls.antiqueId.setValue('1');
    component.productoForm.controls.levelId.setValue(3);
    component.productoForm.controls.ubication.setValue('1');
    component.productoForm.controls.address.setValue('Carrera 80B');
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

    expect(productoService.guardar).toHaveBeenCalled();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
