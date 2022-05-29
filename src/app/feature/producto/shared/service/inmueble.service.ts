import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Inmueble } from '../model/inmueble';


@Injectable()
export class InmuebleService {

  constructor(private httpClient: HttpClient) {}

  public consultarInmuebles() {
    return this.httpClient.get<Inmueble[]>(`${environment.endpoint}/buildings`);
  }

  public consultarInmueble(id: number) {
    return this.httpClient.get<Inmueble>(`${environment.endpoint}/buildings/${id}`);
  }

  public guardar(inmueble: Inmueble) {
    return this.httpClient.post<Inmueble>(`${environment.endpoint}/buildings`, inmueble);
  }

  public actualizar(inmueble: Inmueble) {
    return this.httpClient.put<Inmueble>(`${environment.endpoint}/buildings/${inmueble.id}`, inmueble);
  }

  // public eliminar(producto: Inmueble) {
  //   return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${producto.id}`, this.http.optsName('eliminar productos'));
  // }
}
