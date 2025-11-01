# 🎬 Movies DOM - Ejercicio de Manipulación del DOM

## 📋 Descripción del Proyecto

Este ejercicio te ayudará a practicar la manipulación del DOM creando una aplicación interactiva de películas con funcionalidades de búsqueda, filtrado y gestión de una watchlist.

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, habrás practicado:

- Manipulación del DOM con JavaScript vanilla
- Gestión de estado de la aplicación
- Event listeners y manejo de eventos
- Renderizado dinámico de contenido
- Filtrado y búsqueda de datos
- Almacenamiento local (localStorage)

## 📁 Estructura del Proyecto

```
movies/
├── index.html          # HTML estático (ya completado)
├── css/
│   └── index.css       # Estilos personalizados (opcional)
├── js/
│   ├── movies.js       # Array de películas y funciones utilitarias
│   └── index.js        # TU CÓDIGO AQUÍ - Lógica de la aplicación
└── README.md          # Este archivo
```

## 🚀 Instrucciones del Ejercicio

### Paso 1: Crear el Estado de la Aplicación

En `js/index.js`, crea un objeto que represente el estado actual de la aplicación:

```javascript
const appState = {
  movies: [], // Array de todas las películas
  filteredMovies: [], // Películas después de aplicar filtros
  watchlist: [], // Películas en la watchlist
  currentGenre: "Todos", // Género actualmente seleccionado
  searchQuery: "", // Término de búsqueda actual
};
```

### Paso 2: Implementar la Función `render()`

Crea una función `render()` que tome el estado actual y actualice el DOM accordingly:

```javascript
function render() {
  // TODO: Implementar las siguientes funciones
  renderMovies();
  renderWatchlist();
  renderGenreFilters();
  updateWatchlistSummary();
}
```

#### 2.1 `renderMovies()`

- Obtén el elemento contenedor de películas
- Limpia el contenido actual
- Itera sobre `appState.filteredMovies`
- Para cada película, crea un elemento HTML usando la función `createMovieCard()`
- Agrega cada elemento al contenedor

#### 2.2 `renderWatchlist()`

- Obtén el elemento contenedor de la watchlist
- Limpia el contenido actual
- Si la watchlist está vacía, muestra el estado vacío
- Si no, itera sobre `appState.watchlist` y crea elementos para cada película

#### 2.3 `renderGenreFilters()`

- Obtén todos los botones de género
- Actualiza las clases CSS para mostrar cuál está activo
- El género activo debe tener la clase `bg-blue-600`, los demás `bg-gray-700`

#### 2.4 `updateWatchlistSummary()`

- Calcula el tiempo total usando `calculateTotalDuration()`
- Actualiza los elementos del DOM que muestran el tiempo y cantidad de películas

### Paso 3: Crear Funciones Auxiliares

#### 3.1 `createMovieCard(movie)`

```javascript
function createMovieCard(movie) {
  // TODO: Crear y retornar un elemento div con toda la información de la película
  // Incluir: imagen, título, géneros, descripción, rating, duración y botón de watchlist
  // El botón debe tener un evento click que llame a toggleWatchlist(movie.id)
}
```

#### 3.2 `createWatchlistItem(movie)`

```javascript
function createWatchlistItem(movie) {
  // TODO: Crear y retornar un elemento para la watchlist
  // Incluir: título, géneros, duración, rating y botón de eliminar
  // El botón debe tener un evento click que llame a removeFromWatchlist(movie.id)
}
```

### Paso 4: Implementar Event Listeners

#### 4.1 Búsqueda

```javascript
function setupSearchListener() {
  const searchInput = document.querySelector(
    'input[placeholder="Buscar películas..."]'
  );
  searchInput.addEventListener("input", (event) => {
    // TODO: Actualizar appState.searchQuery
    // TODO: Llamar a filterMovies()
    // TODO: Llamar a render()
  });
}
```

#### 4.2 Filtros de Género

```javascript
function setupGenreListeners() {
  // TODO: Obtener todos los botones de género
  // TODO: Agregar event listener a cada botón
  // TODO: En el evento, actualizar appState.currentGenre
  // TODO: Llamar a filterMovies() y render()
}
```

#### 4.3 Watchlist

```javascript
function toggleWatchlist(movieId) {
  // TODO: Buscar la película por ID
  // TODO: Si está en la watchlist, removerla
  // TODO: Si no está, añadirla
  // TODO: Actualizar localStorage
  // TODO: Llamar a render()
}

function removeFromWatchlist(movieId) {
  // TODO: Filtrar la película de appState.watchlist
  // TODO: Actualizar localStorage
  // TODO: Llamar a render()
}

function clearWatchlist() {
  // TODO: Vaciar appState.watchlist
  // TODO: Limpiar localStorage
  // TODO: Llamar a render()
}
```

### Paso 5: Lógica de Filtrado

```javascript
function filterMovies() {
  let filtered = [...appState.movies];

  // TODO: Aplicar filtro de género si no es 'Todos'
  if (appState.currentGenre !== "Todos") {
    // filtered = ...
  }

  // TODO: Aplicar filtro de búsqueda si hay query
  if (appState.searchQuery) {
    // filtered = ...
  }

  appState.filteredMovies = filtered;
}
```

### Paso 6: Persistencia con localStorage

```javascript
function saveWatchlistToStorage() {
  // TODO: Guardar appState.watchlist en localStorage
}

function loadWatchlistFromStorage() {
  // TODO: Cargar watchlist desde localStorage
  // TODO: Actualizar appState.watchlist
}
```

### Paso 7: Inicialización

```javascript
function init() {
  // TODO: Cargar películas desde movies.js
  appState.movies = getAllMovies();
  appState.filteredMovies = [...appState.movies];

  // TODO: Cargar watchlist desde localStorage
  loadWatchlistFromStorage();

  // TODO: Configurar event listeners
  setupSearchListener();
  setupGenreListeners();
  setupWatchlistListeners();

  // TODO: Renderizar por primera vez
  render();
}

// TODO: Llamar a init() cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);
```

## 🔧 Funciones Disponibles en movies.js

Puedes usar estas funciones que ya están implementadas:

- `getAllMovies()` - Retorna todas las películas
- `getMovieById(id)` - Busca una película por ID
- `getMoviesByGenre(genre)` - Filtra películas por género
- `searchMovies(query)` - Busca películas por texto
- `getUniqueGenres()` - Obtiene lista de géneros únicos
- `calculateTotalDuration(movieList)` - Calcula tiempo total
- `formatDuration(minutes)` - Formatea duración

## 📝 Criterios de Evaluación

### ✅ Funcionalidades Básicas (60%)

- [ ] Las películas se renderizan correctamente desde el array
- [ ] La búsqueda filtra películas en tiempo real
- [ ] Los filtros de género funcionan correctamente
- [ ] Se pueden añadir películas a la watchlist
- [ ] Se pueden eliminar películas de la watchlist

### ✅ Funcionalidades Avanzadas (25%)

- [ ] El contador de tiempo y películas se actualiza correctamente
- [ ] La watchlist se persiste en localStorage
- [ ] Se puede limpiar toda la watchlist
- [ ] Los estados visuales (botones activos) se actualizan correctamente

### ✅ Calidad del Código (15%)

- [ ] Código bien organizado en funciones
- [ ] Uso correcto de manipulación del DOM
- [ ] Event listeners configurados correctamente
- [ ] Estado de la aplicación manejado correctamente

## 🎨 Mejoras Opcionales (Bonus)

Si terminas antes, puedes implementar:

1. **Ordenamiento**: Botones para ordenar por rating, año, o duración
2. **Favoritos**: Sistema de marcado de películas favoritas
3. **Categorías de watchlist**: Diferentes listas (Para ver, Vistas, Favoritas)
4. **Animaciones**: Transiciones suaves al añadir/quitar películas
5. **Modo oscuro/claro**: Toggle entre temas
6. **Película del día**: Destacar una película aleatoria

## 🐛 Debugging Tips

- Usa `console.log()` para verificar el estado en cada paso
- Usa las DevTools para inspeccionar los elementos del DOM
- Verifica que los event listeners estén correctamente asignados
- Comprueba que las funciones de movies.js estén importadas correctamente

## 🎯 Resultado Esperado

Al finalizar el ejercicio, deberías tener:

- Una aplicación totalmente funcional e interactiva
- Búsqueda en tiempo real que funciona
- Filtros de género que cambian la vista
- Watchlist funcional con persistencia
- Contador de tiempo actualizado dinámicamente
- Interfaz responsive y amigable

¡Buena suerte con el ejercicio! 🚀
