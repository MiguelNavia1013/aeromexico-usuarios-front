import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface SolicitudInicioSesion {
  correoElectronico: string;
}

export interface RespuestaInicioSesion {
  token: string;
  expiraEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAutenticacion {

  private claveToken = 'tokenJwt';

  constructor(private http: HttpClient) { }

  iniciarSesion(datos: SolicitudInicioSesion): Observable<RespuestaInicioSesion> {
    const url = `${environment.urlApi}/api/autenticacion/login`;

    return this.http.post<RespuestaInicioSesion>(url, datos)
      .pipe(
        tap(respuesta => {
          localStorage.setItem(this.claveToken, respuesta.token);
        })
      );
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.claveToken);
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.claveToken);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
