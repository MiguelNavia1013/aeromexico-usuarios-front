import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface UsuarioRespuesta {
  id: string;
  nombre: string;
  correoElectronico: string;
  rol: string;
  fechaCreacion: string;
  fechaActualizacion?: string | null;
}

export interface UsuarioCrear {
  nombre: string;
  correoElectronico: string;
  rol: string;
}

export interface UsuarioActualizar {
  nombre: string;
  correoElectronico: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarios {

  private urlBase = `${environment.urlApi}/api/usuarios`;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<UsuarioRespuesta[]> {
    return this.http.get<UsuarioRespuesta[]>(this.urlBase);
  }

  crear(usuario: UsuarioCrear): Observable<UsuarioRespuesta> {
    return this.http.post<UsuarioRespuesta>(this.urlBase, usuario);
  }

  actualizar(id: string, usuario: UsuarioActualizar): Observable<UsuarioRespuesta> {
    const url = `${this.urlBase}/${id}`;
    return this.http.put<UsuarioRespuesta>(url, usuario);
  }

  eliminar(id: string): Observable<void> {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete<void>(url);
  }
}
