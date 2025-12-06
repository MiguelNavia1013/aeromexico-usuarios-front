✈️ Aeromexico – Frontend de Administración de Usuarios

Aplicación desarrollada en Angular 17 Standalone Components, que consume la API Aeromexico Usuarios.
Incluye:

Login con JWT

CRUD de usuarios

Vista de auditoría

Guards de autenticación

Interceptor para token

UI limpia con estilos personalizados

🛠️ Tecnologías utilizadas
Función	Tecnología
Framework	Angular 17
Routing	Angular Router (standalone)
HTTP	HttpClient
Auth	JWT + Interceptor
Estilos	SCSS global
Guards	CanActivateFn
🚀 Requisitos previos

Node.js 18+

Angular CLI 17+

Navegador moderno

Backend .NET corriendo en local

📦 Instalación
npm install

▶️ Ejecutar el proyecto
ng serve -o


Se abrirá en:

👉 http://localhost:4200/

🔐 Autenticación

El login requiere que exista un usuario en la API.
Por default, el backend crea automáticamente:

admin@aeromexico.com


El frontend guarda el token en localStorage.

🧩 Arquitectura del frontend
/src
 ├─ /app
 │    ├── app.routes.ts
 │    ├── app.config.ts
 │    ├── servicios/
 │    │      ├── servicio-autenticacion.service.ts
 │    │      └── servicio-usuarios.service.ts
 │    ├── interceptores/
 │    │      └── interceptor-autorizacion.interceptor.ts
 │    ├── guardianes/
 │    │      └── guardian-autenticacion.guard.ts
 │    ├── paginas/
 │           ├── pagina-inicio-sesion/
 │           ├── pagina-lista-usuarios/
 │           └── pagina-auditoria/
 ├─ /environments/
 │      └── environment.ts
 └─ styles.scss

🌐 Configuración de API

En src/environments/environment.ts:

export const environment = {
  production: false,
  urlApi: 'https://localhost:44302'
};


(Ajusta el puerto según tu API)

🛡 Seguridad frontend
🔹 Interceptor JWT

Agrega automáticamente el token en todas las peticiones:

Authorization: Bearer {token}

🔹 Guard de autenticación

Bloquea rutas sensibles:

{ path: 'usuarios', canActivate: [guardianAutenticacion] }

📄 Funcionalidades
🔹 Inicio de sesión

Solo solicita correo

Si es válido, redirige a /usuarios

🔹 Administración de usuarios

Crear usuario

Editar usuario

Eliminar usuario

Validaciones visuales

Mensajes de éxito/error

Redibujo estable gracias a ChangeDetectorRef

🔹 Auditoría

Tabla con acciones históricas

Botón para volver a administración de usuarios

🎨 Mejoras visuales

Incluyen:

Layout centrado

Tarjetas (.tarjeta) con sombra

Tablas limpias

Botones estilizados (primario, secundario, peligro)

Alertas de error/exito visibles

🧪 Pruebas recomendadas

Login → Usuarios → Auditoría

Crear usuario → ver auditoría

Editar usuario → ver auditoría

Eliminar usuario → ver auditoría

Intentar entrar a /usuarios sin token → redirige a login

Ver manejo de errores en pantalla

📝 Extras implementados (Plus)

Angular 17 Standalone

Guards modernos (CanActivateFn)

Interceptor funcional

SCSS global profesional

UI limpia tipo dashboard

Mensajes consistentes de error/exito

Carga estable con ChangeDetectorRef
