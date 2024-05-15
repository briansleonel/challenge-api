# Challeng API

REST API with functionality to manage users and products. It also allows a user to register and log in to the system and authenticate each user using an authentication token. 

## Starting 🚀

These instructions will guide you to get a working copy of this project on your local machine for development and testing purposes.

### Prerequisites 📋

To run this project you will need to create a database in postgresql called db_restaurants. And in the `.env` file, you will have to enter the corresponding credentials to be able to access the database.

The file would look something like this:

```env
PORT=3000

DB_HOSTNAME=YOUR_HOST
DB_PORT=YOUR_PORT
DB_USER=YOUR_USER_DB
DB_PASSWORD=YOUR_PASSWORD_DB
DB_NAME=YOUR_DATABASAE_NAME
```

### Installation 🔧

Open a terminal and go to the folder in which you want to clone the project.

Clone GitHub repository:

```sh
$ git clone https://github.com/briansleonel/challenge-api.git
```

#### Run the Server

Navigate to `challenge-api` folder of the project via the terminal and install the dependencies:

```bash
$ cd server
$ yarn install

# --- Running the app ---

# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

### Preguntas 🚀

#### ¿Qué es un middleware y cuál es su utilidad en una aplicación backend? 

Un middleware son funciones que actúan como intermediario entre una solicitud al servidor y un único endpoint o un conjunto de endpoints de un controlador. Estas funciones pueden realizar tareas como autenticación y autorización de usuarios, el manejo de errores, logger de peticiones, etc. 

Request ----> Middleware -----> Controller

#### ¿Qué es SQL Injection y cómo puede evitarse? 

SQL Injection es un tipo de ciberataque, o vulnerabilidad que se da cuando un atacante inserta un código SQL para modificar, recuperar o eliminar datos sensibles de una base de datos. 
Para poder evitar este tipo de ataques se puede hacer uso de consultas parametrizadas que separan los datos ingresado por un usuario de una sentencia SQL. También se podría hacer uso de stored procedure para comprobar los datos de entrada.

#### ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo. 

Las SQL Transactions es conveniente usarlas cuando se realizan un conjunto de operaciones que deben completarse al mismo tiempo dentro de una base de datos. Un ejemplo básico puede ser el querer dar de alta un conjunto de productos dentro de una base de datos. Otro ejemplo puede ser al realizar una compra dentro de una aplicación, donde se necesata hacer varias operaciones en la base de datos tales como actualizar el stock de los productos, registrar el pedido y realizar el pago.

#### Usando async/await: ¿cómo se puede aprovechar el paralelismo? 

Para aprovechar el paralelismo al usar async/await se puede realizar múltiples operaciones asíncronas de forma simultánea, y esperando a que todas finalicen mediante el uso de 'Promise.all()'. Al usar esto se puede mejorar el rendimiento de una aplicación.

## Auhors ✒️

-   **González, Brian Leonel** - [briansleonel](https://github.com/briansleonel)
