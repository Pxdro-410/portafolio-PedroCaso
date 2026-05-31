# Portafolio — Pedro Julio Caso

Portafolio personal desarrollado como Single Page Application. Presenta mi perfil profesional, stack tecnológico, proyectos reales con detalle técnico y medios de contacto. Construido con React 19 y Vite, con animaciones declarativas mediante Framer Motion y un fondo interactivo con la API 2D de HTML5 Canvas.

**Deploy en producción:** https://pxdro-410.github.io/portafolio-PedroCaso/

---

## Tecnologías utilizadas

| Categoria         | Tecnología                              |
|-------------------|-----------------------------------------|
| Framework UI      | React 19                                |
| Bundler           | Vite 8                                  |
| Estilos           | Tailwind CSS 3                          |
| Animaciones       | Framer Motion 12                        |
| Iconos            | Lucide React                            |
| Tipografía        | Lora (headings), Geist (body), JetBrains Mono (código) |
| Fondo interactivo | HTML5 Canvas 2D API                     |
| Deploy            | GitHub Pages + gh-pages                 |
| Linting           | ESLint                                  |
| Formateo          | Prettier                                |

---

## Contenido del portafolio

### Hero
Presentación inicial con nombre, título profesional y descripción breve. Incluye accesos directos a GitHub, LinkedIn y correo electrónico, y un estado de disponibilidad laboral.

### Sobre mí
Descripción biográfica con formación académica (Ingeniería en Ciencias de la Computación, UVG) y experiencia. Tarjetas de áreas de especialización: Front-end, Back-end, Bases de datos, Full-Stack y Formación. Estadísticas rápidas de actividad en GitHub.

### Tecnologías
Listado del stack personal organizado por categoría: Front-end, Back-end, Bases de datos y DevOps/Tools. Cada tecnología muestra un tooltip con la justificación técnica de por qué fue elegida. Las categorías son filtrables mediante tabs. Incluye un bloque de texto explicando la decisión general del stack.

### Proyectos
Grilla de proyectos reales con filtro por tipo (Full-Stack, Frontend, Backend). Cada tarjeta muestra el título y las tecnologías usadas. Al hacer clic se abre un modal con la descripción completa del proyecto, la justificación de elección de tecnologías, el stack con colores de referencia y los enlaces a código fuente y demo en vivo.

### Contacto
Tarjetas de acceso directo a GitHub, LinkedIn y correo electrónico.

---

## Correr el proyecto localmente

**Requisitos:** Node.js 18+ y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Pxdro-410/portafolio-PedroCaso.git
cd portafolio-PedroCaso

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Otros comandos

```bash
npm run build        # Genera el build de producción en /dist
npm run preview      # Sirve el build de producción localmente
npm run lint         # Ejecuta ESLint sobre el código fuente
npm run format       # Formatea el código con Prettier
npm run format:check # Verifica el formato sin modificar archivos
```

---

## Deploy en producción

El portafolio está configurado para desplegarse en GitHub Pages mediante el paquete `gh-pages`.

```bash
npm run deploy
```

Este comando ejecuta primero `npm run build` (via el script `predeploy`) y luego publica el contenido de `/dist` en la rama `gh-pages` del repositorio. El resultado queda disponible en:

https://pxdro-410.github.io/portafolio-PedroCaso/

---

## Estructura del proyecto

```
src/
  assets/          # Imágenes y recursos estáticos
  components/
    canvas/        # Fondo interactivo con Canvas 2D
    layout/        # Navbar
    sections/      # Hero, About, Technologies, Projects, Contact
    ui/            # Iconos SVG y componentes reutilizables
  data/            # Datos de proyectos y tecnologías
  hooks/           # useScrollReveal (IntersectionObserver)
```
