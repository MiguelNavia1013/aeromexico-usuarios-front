import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioAutenticacion } from '../servicios/servicios/servicio-autenticacion';

/**
 * Guardián de rutas que verifica si el usuario esta autenticado.
 * Si no tiene token, lo redirige a la pagina de inicio de sesion.
 */
export const guardianAutenticacion: CanActivateFn = (route, state) => {
    const servicioAutenticacion = inject(ServicioAutenticacion);
    const router = inject(Router);

    // Si hay token, permitimos el acceso.
    if (servicioAutenticacion.estaAutenticado()) {
        return true;
    }

    // Si no hay token, redirigimos a inicio de sesion.
    router.navigate(['/inicio-sesion'], {
        queryParams: { regresarA: state.url }
    });

    return false;
};
