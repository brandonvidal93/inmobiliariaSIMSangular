import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarInmuebleComponent } from './listar-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InmuebleService } from '../../shared/service/inmueble.service';
import { Inmueble } from '../../shared/model/inmueble';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarInmuebleComponent', () => {
  let component: ListarInmuebleComponent;
  let fixture: ComponentFixture<ListarInmuebleComponent>;
  let productoService: InmuebleService;
  const listaProductos: Inmueble[] = [new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado')];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarInmuebleComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [InmuebleService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInmuebleComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(InmuebleService);
    spyOn(productoService, 'consultarInmuebles').and.returnValue(
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.listaProductos.subscribe(resultado => {
    //   expect(1).toBe(resultado.length);
    // });
  });

});
