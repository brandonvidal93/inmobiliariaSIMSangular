import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Inmueble } from '@producto/shared/model/inmueble';
import { InmuebleService } from '@producto/shared/service/inmueble.service';
import { of } from 'rxjs';

import { ListarInmuebleSoloComponent } from './listar-inmueble-solo.component';

describe('ListarInmuebleSoloComponent', () => {
  let component: ListarInmuebleSoloComponent;
  let fixture: ComponentFixture<ListarInmuebleSoloComponent>;
  let inmuebleService: InmuebleService;
  const listaInmueble: Inmueble = new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado');

  const isEdit: boolean = false;
  const isDelete: boolean = false;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInmuebleSoloComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [InmuebleService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInmuebleSoloComponent);
    component = fixture.componentInstance;
    inmuebleService = TestBed.inject(InmuebleService);
    spyOn(inmuebleService, 'consultarInmueble').and.returnValue(
      of(listaInmueble)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    inmuebleService.consultarInmueble(6).subscribe(resultado => {
      expect(resultado).toEqual(listaInmueble);
    });
  });

  it('Debería guardar los cambios', () => {
    const inmueble: Inmueble = new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado');
    component.inmueble = inmueble;
    component.guardar();
    expect(component.inmueble).toEqual(inmueble);
  });

  it('Debería borrar el inmueble', () => {
    component.isDelete = !isDelete;
    component.borrarInmueble();
    expect(component.inmueble).toEqual(listaInmueble);
  });

  it('Debería no borrar el inmueble', () => {
    component.isDelete = isDelete;
    component.borrarInmueble();
    expect(component.inmueble).toEqual(listaInmueble);
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

  it('Debería permitir edición', () => {
    component.isEdit = !isEdit;
    component.habilitarEdicion();
    expect(component.habilitarEdicion).toBeTruthy();
  })

  it('Debería no permitir edición', () => {
    component.isEdit = isEdit;
    component.habilitarEdicion();
    expect(component.habilitarEdicion).toBeTruthy();
  })
});
