#Api ciudades
- Muestra información especificas como la temperatura, Hora y coordenas
- Utiliza Redis cache para almacenar las coordenadas
- Sockets para la actualización de la información
- Api trabaja en el puerto:3000

#Instalación
Clonar el repositorio

$ git clone ...

Instalar app

$ npm install

Instalar redis en la maquina 

windows: https://riptutorial.com/es/redis/example/29962/instalacion-y-ejecucion-de-redis-server-en-windows
mac: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298

Corre redis en un terminal para activar el motor de base de datos en memoria,
$ redis-server

Correr el comando para inicializar al app, en una terminal distinta que donde se ejecuto redis
$ nodemon server/server.js

Paquete

- NodeJS
- Express 4.17.1
- Redis 3.0.2
- Sockect.io 3.0.4  
- entre otros

