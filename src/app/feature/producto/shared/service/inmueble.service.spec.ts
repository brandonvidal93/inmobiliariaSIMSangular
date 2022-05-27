import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InmuebleService } from './inmueble.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Inmueble } from '../model/inmueble';
import { HttpResponse } from '@angular/common/http';

describe('InmuebleService', () => {
  let httpMock: HttpTestingController;
  let service: InmuebleService;
  const apiEndpointProductoConsulta = `${environment.endpoint}/tiposFamilia`;
  const apiEndpointProductos = `${environment.endpoint}/productos`;

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

  it('deberia listar productos', () => {
    const dummyProductos = [
      new Inmueble('1', 'Inmueble 1'), new Inmueble('2', 'Inmueble 2')
    ];
    service.consultarInmuebles().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
    });
    const req = httpMock.expectOne(apiEndpointProductoConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('deberia crear un producto', () => {
    const dummyProducto = new Inmueble('1', 'Inmueble 1');
    service.guardar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointProductos);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un producto', () => {
    const dummyProducto = new Inmueble('1', 'Inmueble 1');
    service.eliminar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointProductos}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});