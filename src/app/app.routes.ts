import { PaginaAuditoria } from './paginas/pagina-auditoria/pagina-auditoria';
import { Routes } from '@angular/router';
import { PaginaInicioSesion } from './paginas/pagina-inicio-sesion/pagina-inicio-sesion';
import { PaginaListaUsuarios } from './paginas/pagina-lista-usuarios/pagina-lista-usuarios';
import { guardianAutenticacion } from './guardianes/guardian-autenticacion.guard';

export const routes: Routes = [
  { path: 'inicio-sesion', component: PaginaInicioSesion },
  { path: 'usuarios', component: PaginaListaUsuarios, canActivate: [guardianAutenticacion] },
  { path: 'auditoria', component: PaginaAuditoria, canActivate: [guardianAutenticacion] },
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio-sesion' }
];
