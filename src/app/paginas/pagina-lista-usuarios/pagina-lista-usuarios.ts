import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServicioUsuarios, UsuarioRespuesta } from '../../servicios/servicios/servicio-usuarios';
import { ServicioAutenticacion } from '../../servicios/servicios/servicio-autenticacion';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pagina-lista-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pagina-lista-usuarios.html'
})
export class PaginaListaUsuarios implements OnInit {

  usuarios: UsuarioRespuesta[] = [];
  formularioUsuario: FormGroup;
  idUsuarioEditando: string | null = null;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(
    private fb: FormBuilder,
    private servicioUsuarios: ServicioUsuarios,
    private servicioAuth: ServicioAutenticacion,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formularioUsuario = this.fb.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.servicioAuth.estaAutenticado()) {
      this.router.navigate(['/inicio-sesion']);
      return;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.mensajeError = null;

    this.servicioUsuarios.obtenerTodos()
      .subscribe({
        next: usuarios => {
          this.usuarios = usuarios;
          this.cdr.detectChanges();
        },
        error: error => {
          console.error('Error obteniendo usuarios', error);
          this.mensajeError = 'Ocurrió un error al obtener los usuarios.';
        }
      });
  }
  guardarUsuario(): void {
    this.mensajeError = null;
    this.mensajeExito = null;

    if (this.formularioUsuario.invalid) {
      this.mensajeError = 'Por favor completa correctamente los datos del usuario.';
      this.formularioUsuario.markAllAsTouched();
      return;
    }

    const datos = this.formularioUsuario.value;

    if (this.idUsuarioEditando) {
      this.servicioUsuarios.actualizar(this.idUsuarioEditando, datos)
        .subscribe({
          next: () => {
            this.mensajeExito = 'Usuario actualizado correctamente.';
            this.idUsuarioEditando = null;
            this.formularioUsuario.reset();
            this.cargarUsuarios();
          },
          error: error => {
            console.error('Error actualizando usuario', error);
            this.mensajeError = 'No fue posible actualizar el usuario.';
          }
        });
    } else {
      this.servicioUsuarios.crear(datos)
        .subscribe({
          next: () => {
            this.mensajeExito = 'Usuario creado correctamente.';
            this.formularioUsuario.reset();
            this.cargarUsuarios();
          },
          error: error => {
            console.error('Error creando usuario', error);
            if (error.status === 409) {
              this.mensajeError = 'Ya existe un usuario con el mismo correo electrónico.';
            } else {
              this.mensajeError = 'No fue posible crear el usuario.';
            }
          }
        });
    }
  }

  seleccionarUsuarioParaEditar(usuario: UsuarioRespuesta): void {
    this.idUsuarioEditando = usuario.id;
    this.formularioUsuario.setValue({
      nombre: usuario.nombre,
      correoElectronico: usuario.correoElectronico,
      rol: usuario.rol
    });
  }

  eliminarUsuario(usuario: UsuarioRespuesta): void {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar al usuario "${usuario.nombre}"?`);
    if (!confirmar) return;

    this.mensajeError = null;
    this.mensajeExito = null;

    this.servicioUsuarios.eliminar(usuario.id)
      .subscribe({
        next: () => {
          this.mensajeExito = 'Usuario eliminado correctamente.';
          this.cargarUsuarios();
        },
        error: error => {
          console.error('Error eliminando usuario', error);
          this.mensajeError = 'No fue posible eliminar el usuario.';
        }
      });
  }

  irAUsuarios(): void {
    this.cargarUsuarios();
  }

  cerrarSesion(): void {
    this.servicioAuth.cerrarSesion();
    this.router.navigate(['/inicio-sesion']);
  }
}
