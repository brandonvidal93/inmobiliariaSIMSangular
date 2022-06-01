import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InmuebleService } from './inmueble.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Inmueble } from '../model/inmueble';

describe('InmuebleService', () => {
  let httpMock: HttpTestingController;
  let service: InmuebleService;
  const apiEndpointInmueble = `${environment.endpoint}/buildings`;
  // const apiEndpointProductos = `${environment.endpoint}/productos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InmuebleService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(InmuebleService);
  });

  it('should be created', () => {
    const productService: InmuebleService = TestBed.inject(InmuebleService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar inmuebles', () => {
    const dummyInmuebles = [
      new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado')
    ];
    service.consultarInmuebles().subscribe(inmuebles => {
      expect(inmuebles.length).toBe(1);
      expect(inmuebles).toEqual(dummyInmuebles);
    });
    const req = httpMock.expectOne(apiEndpointInmueble);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInmuebles);
  });

  it('deberia consultar un inmueble', () => {
    const dummyInmueble = new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado');

    service.consultarInmueble(6).subscribe(inmueble => {
      expect(inmueble).toEqual(dummyInmueble);
    });
    const req = httpMock.expectOne(apiEndpointInmueble + '/6');
    expect(req.request.method).toBe('GET');
    req.flush(dummyInmueble);
  });

  it('deberia crear un producto', () => {
    const dummyProducto = new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado');

    service.guardar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyProducto);
    });
    const req = httpMock.expectOne(apiEndpointInmueble);
    expect(req.request.method).toBe('POST');
    req.flush(dummyProducto);
  });

  it('deberia actualizar un producto', () => {
    const dummyProducto = new Inmueble(6, '1', 200, 200, '2', 3, '10', 0.15, '10 - La Candelaria', 'Carrera 80B', 4, 2, 3, 1, 2, 350000000, 297500000, 250000, 1500000, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Apartamento amplio y bien ubicado');

    service.actualizar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyProducto);
    });
    const req = httpMock.expectOne(apiEndpointInmueble + '/6');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyProducto);
  });

  it('deberia eliminar un producto', () => {
    const idInmueble: number = 6;
    
    service.eliminar(idInmueble).subscribe(() => {
      expect(true).toBeTruthy();
    });
    const req = httpMock.expectOne(apiEndpointInmueble + '/6');
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
