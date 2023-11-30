# Frontend - SPA en Angular

### Proyecto de criptografía utilizando RSA y AES

### Pasos para ejecutar el proyecto de manera local

1. Clonar el repositorio
```sh
git clone
```
2. Instalar dependencias
```sh
npm install
```
3. Ejecutar el proyecto
```sh
ng serve -o
```
4. Abrir el navegador en la siguiente dirección
```sh
http://localhost:4200/
```

### Estructura del Proyecto
  
  ```
  ├── src
  │   ├── app
  │   │   ├── filters
  │   │   │   ├── components
  │   │   │   │   ├── btn-encrypt    # Lógica para encriptar/desencriptar
  │   │   │   │   ├── file-upload    # Lógica para subir archivos .txt
  │   │   │   │   ├── text-area      # Lógica para mostrar texto
  │   │   │   │   └── view-pass      # Lógica para mostrar contraseñas
  │   │   │   ├── interfaces         # Interfaces para el proyecto
  │   │   │   ├── pages
  │   │   │   │   ├── aes            # Página de criptografía AES
  │   │   │   │   ├── rsa            # Página de criptografía RSA
  │   │   │   │   └── layout         # Página de layout
  │   │   │   ├── services
  │   │   │   │   ├── cryptography   # Servicio para criptografía
  │   │   │   │   └── local-storage  # Servicio para almacenar en local storage
  │   │   │   ├── filters-routing    # Rutas para el proyecto
  │   │   │   └── filters.module     # Módulo para el proyecto
  │   │   ├── primng
  │   │   │    └── primeng.module    # Módulo para primeng
  │   │   ├── shared
  │   │   │   ├── components
  │   │   │   │   └── navbar         # Componente para la barra de navegación
  │   ├── assets                     # Imágenes para el proyecto
  │   ├── environments               # Variables de entorno
