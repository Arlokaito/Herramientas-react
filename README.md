
# 🧰 Herramientas React

Esta es una aplicación web desarrollada en **React** que agrupa múltiples herramientas de utilidad diaria en una sola interfaz. Fue diseñada como un proyecto práctico para aprender y aplicar conceptos modernos de React, incluyendo **hooks**, **manejo de estado**, **localStorage**, **modo oscuro**, y **despliegue en GitHub Pages**.

---

## 🚀 Características principales

La aplicación incluye una **barra de navegación** que permite cambiar entre las siguientes herramientas:

1. **🧮 Calculadora**
   - Soporta operaciones básicas, porcentajes, paréntesis y teclado.
   - Prevención de errores con operadores duplicados.

2. **📝 To-Do List**
   - Agregar tareas con Enter o botón.
   - Enumeración automática de tareas con ID reutilizable.
   - Marcar tareas como completadas (se reordenan al final).
   - Reordenar tareas con drag & drop.
   - Ordenar lista ascendente/descendente.
   - Guardado persistente con `localStorage`.

3. **🔐 Generador de Contraseñas**
   - Genera contraseñas aleatorias.
   - Permite guardar, copiar y eliminar contraseñas.
   - Historial persistente con `localStorage`.

4. **🔄 Conversor de Unidades**
   - (En desarrollo) Conversión entre pesos y distancias.

5. **🌙 Modo Oscuro / Claro**
   - Se puede alternar desde la barra de navegación.
   - Afecta a toda la interfaz visual (calculadora, to-do, contraseñas, etc.).

---

## 🛠️ Tecnologías utilizadas

- **React** (con `create-react-app`)
- **JavaScript (ES6+)**
- **HTML / CSS**
- **GitHub Pages** (para despliegue)
- **localStorage** (para persistencia)

---

## 📁 Estructura del proyecto

```
Herramientas-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Calculadora.jsx
│   │   ├── Conversor.jsx
│   │   ├── GeneradorContrasenia.jsx
│   │   ├── Navbar.jsx
│   │   ├── Todolist.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

---

## 📜 Scripts disponibles

En la raíz del proyecto, puedes ejecutar:

| Comando              | Descripción                                        |
|----------------------|----------------------------------------------------|
| `npm start`          | Inicia el servidor de desarrollo (`localhost:3000`) |
| `npm run build`      | Crea una versión optimizada del proyecto           |
| `npm run deploy`     | Despliega la app en GitHub Pages                   |

---

## 📦 Instalación y uso local

> Requiere tener instalado **Node.js** y **npm**.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Arlokaito/Herramientas-react.git
   cd Herramientas-react
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🌐 Despliegue en producción

La aplicación está desplegada en:

🔗 [https://arlokaito.github.io/Herramientas-react](https://arlokaito.github.io/Herramientas-react)

El despliegue se realiza mediante el paquete `gh-pages` y el script `npm run deploy`.

---

## 📌 Estado actual

- Calculadora: ✅
- To-Do List: ✅
- Generador de Contraseñas: ✅
- Conversor: 🛠️ En desarrollo
- Modo Oscuro: ✅

---

## ✍️ Autor

- **Carlos Estrada** – Proyecto educativo y personal.
