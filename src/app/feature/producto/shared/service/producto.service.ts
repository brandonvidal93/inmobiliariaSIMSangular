import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';


@Injectable()
export class ProductoService {

  constructor(private httpClient: HttpClient) {}

  public consultarInmuebles() {
    return this.httpClient.get<Producto[]>(`${environment.endpoint}/buildings`);
  }

  public consultarInmueble(id: number) {
    return this.httpClient.get<Producto>(`${environment.endpoint}/buildings/${id}`);
  }

  public guardar(producto: Producto) {
    return this.httpClient.post<Producto>(`${environment.endpoint}/buildings`, producto);
  }

  // public eliminar(producto: Producto) {
  //   return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${producto.id}`, this.http.optsName('eliminar productos'));
  // }
}

// export class ProductoService {

//   constructor(protected http: HttpService) {}

//   public consultarInmuebles() {
//     return this.http.doGet<Producto[]>(`${environment.endpoint}/buildings`, this.http.optsName('consultar productos'));
//   }

//   public guardar(producto: Producto) {
//     console.log(producto);
//     return this.http.doPost<Producto, boolean>(`${environment.endpoint}/buildings`, producto, this.http.optsName('crear/actualizar productos'));
//   }

//   public eliminar(producto: Producto) {
//     return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${producto.id}`, this.http.optsName('eliminar productos'));
//   }
// }
