import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface RegistroAuditoria {
  id: string;
  idUsuario: string;
  accion: string;
  fechaHora: string;
  realizadoPor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAuditoria {

  private urlBase = `${environment.urlApi}/api/auditoria`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los registros de auditoria.
   */
  obtenerTodos(): Observable<RegistroAuditoria[]> {
    return this.http.get<RegistroAuditoria[]>(this.urlBase);
  }

  /**
   * Obtiene los registros de auditoria de un usuario especifico.
   */
  obtenerPorUsuario(idUsuario: string): Observable<RegistroAuditoria[]> {
    const url = `${this.urlBase}/usuario/${idUsuario}`;
    return this.http.get<RegistroAuditoria[]>(url);
  }
}
