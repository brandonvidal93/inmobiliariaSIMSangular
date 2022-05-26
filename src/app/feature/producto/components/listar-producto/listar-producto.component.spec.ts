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
  const listaProductos: Inmueble[] = [new Inmueble('1', 'Inmueble 1'), new Inmueble('2', 'Inmueble 2')];

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
    spyOn(productoService, 'consultar').and.returnValue(
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaProductos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
