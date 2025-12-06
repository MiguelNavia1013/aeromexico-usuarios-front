import { ServicioAutenticacion } from './../servicios/servicios/servicio-autenticacion';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const interceptorAutorizacion: HttpInterceptorFn = (req, next) => {
    const servicioAutenticacion = inject<ServicioAutenticacion>(ServicioAutenticacion);
    const token = servicioAutenticacion.obtenerToken();

    if (token) {
        const reqConToken = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next(reqConToken);
    }

    return next(req);
};
