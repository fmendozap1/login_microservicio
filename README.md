# 🛡️ Login Microservicio

Microservicio de autenticación en **Node.js + Express + Sequelize** con **JWT** para manejo de sesiones, ideal como base para sistemas escalables en tus proyectos personales o de empresa.

---

## 🚀 Características

✅ API REST para autenticación de usuarios.  
✅ Encriptación de contraseñas con **bcrypt**.  
✅ Generación y validación de **tokens JWT**.  
✅ Uso de **MySQL** con **Sequelize ORM**.  
✅ Configuración de variables de entorno con **dotenv**.  
✅ Listo para integrar con frontend en Angular, React, Flutter u otros.

---

## 🛠️ Tecnologías usadas

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL2**
- **JWT-Simple**
- **Bcrypt**
- **Moment**
- **Dotenv**
- **CORS**

---

## 📂 Estructura del proyecto
📂 controllers/ # Controladores de rutas
📂 db/ # Configuración de la conexión a la base de datos
📂 middlewares/ # Middlewares para validaciones y autenticación
📂 models/ # Modelos Sequelize
📂 routes/ # Rutas del API REST
📂 services/ # Servicios de lógica de negocio

## ⚙️ Configuración e instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/fmendozap1/login_microservicio.git
cd login_microservicio
```
2️⃣ Instalar dependencias

```bash
npm install
```

3️⃣ Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto con este contenido:

```bash
DB=db_login
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=3306

SECRET_KEY=tu_clave_secreta
PORT=3000
```

🩺 Endpoints de ejemplo
POST /api/auth/login – Login de usuario.
GET /api/usuarios/ – Listado de usuarios (protegido).
POST /api/usuarios/ – Crear usuario (protegido).

🛡️ Seguridad
✅ Contraseñas encriptadas con bcrypt.
✅ Uso de JWT para sesiones seguras.
✅ Validación de token en rutas protegidas mediante middlewares.

👨‍💻 Autor
Fabio Enrique Mendoza Palechor
📧 ing.mendoza@hotmail.com
🌐 https://www.linkedin.com/in/fabiomendoza/
