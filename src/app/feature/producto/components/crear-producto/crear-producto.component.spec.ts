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

  const eventType = {
    target: {
      value: '1'
    }
  };

  const eventTypeFalse = {
    target: {
      value: '2'
    }
  };

  const eventAntique = {
    target: {
      value: '1'
    }
  };

  const eventAntiquePolicy = {
    target: {
      value: '3'
    }
  };

  const eventUbication = {
    target: {
      value: '1_0.1_1 - Popular'
    }
  };

  const eventPrice = {
    target: {
      value: '150000000'
    }
  };

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

  it('Registrando inmueble', () => {
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

  it('validando si es apartamento', () => {
    component.handleTypeBuilding(eventType);
    expect(component.handleTypeBuilding).toBeTruthy();
  });

  it('validando si es casa', () => {
    component.handleTypeBuilding(eventTypeFalse);
    expect(component.handleTypeBuilding).toBeTruthy();
  });

  it('Seleccionando antiguedad', () => {
    component.handleChangeAntique(eventAntique);
    expect(component.handleChangeAntique).toBeTruthy();
  });

  it('Seleccionando antiguedad mayor a 5 años', () => {
    component.handleChangeAntique(eventAntiquePolicy);
    expect(component.handleChangeAntique).toBeTruthy();
  });

  it('Seleccionando ubicación', () => {
    component.handleUbication(eventUbication);
    expect(component.handleUbication).toBeTruthy();
  });

  it('Convirtiendo el precio del inmueble', () => {
    component.handleChangePrice(eventPrice);
    expect(component.handleChangePrice).toBeTruthy();
  });
});
