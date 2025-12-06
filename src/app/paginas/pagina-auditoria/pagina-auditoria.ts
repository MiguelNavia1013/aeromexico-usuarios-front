import { RegistroAuditoria, ServicioAuditoria } from './../../servicios/servicios/servicio-auditoria';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-auditoria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagina-auditoria.html'
})
export class PaginaAuditoria implements OnInit {

  registros: RegistroAuditoria[] = [];
  mensajeError: string | null = null;

  constructor(private servicioAuditoria: ServicioAuditoria,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Al iniciar el componente, cargamos todos los registros de auditoria.
   */
  ngOnInit(): void {
    this.cargarAuditoria();
  }

  /**
   * Llama al servicio para obtener todos los registros de auditoria.
   */
  cargarAuditoria(): void {
    this.mensajeError = null;

    this.servicioAuditoria.obtenerTodos()
      .subscribe({
        next: registros => {
          this.registros = registros
          this.cdr.detectChanges();
        },
        error: error => {
          console.error('Error obteniendo auditoria', error);
          this.mensajeError = 'No fue posible obtener los registros de auditoría.';
        }
      });
  }
}
