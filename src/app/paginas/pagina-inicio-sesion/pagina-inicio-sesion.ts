import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioAutenticacion } from '../../servicios/servicios/servicio-autenticacion';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pagina-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pagina-inicio-sesion.html'
})
export class PaginaInicioSesion {

  formularioInicioSesion: FormGroup;
  mensajeError: string | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private servicioAuth: ServicioAutenticacion,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formularioInicioSesion = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]]
    });
  }

  iniciarSesion(): void {
    this.mensajeError = null;

    if (this.formularioInicioSesion.invalid) {
      this.mensajeError = 'Ingresa un correo válido.';
      return;
    }

    this.cargando = true;

    this.servicioAuth.iniciarSesion(this.formularioInicioSesion.value)
      .subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error en inicio de sesion', error);
          this.cargando = false;

          if (error.status === 401) {
            this.mensajeError = 'Credenciales inválidas. Verifica el correo electrónico.';
          } else {
            this.mensajeError = 'No fue posible iniciar sesión. Intenta de nuevo más tarde.';
          }
          this.cdr.detectChanges();
        }
      });
  }
}
