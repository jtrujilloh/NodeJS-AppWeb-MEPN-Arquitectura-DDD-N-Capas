[By José Alfredo Trujillo Hidalgo]

# NodeJs Developer Test 11-01-2018

Proyecto NodeJS que se compone de tres soluciones interoperables entre sí, de muy fácil despliegue y configuración, pero con una arquitectura robusta y con posibilidades de ser mantenible por equipos o personas independientes. 

* Se componen de: 
  * Aplicación Web.
    * Utiliza el motor de plantillas PUG (Compila archivos *.pug a formato HTML en tiempo de ejecución y renderizado)
  * Api REST.
    * Módulo desarrollado con arquitectura de N-Capas orientado al dominio.
  * Jobs (programables de ejecución independiente a toda la aplicación). 
    * módulo desarrollado con arquitectura de N-Capas orientado al dominio.

-------------------------------------------

* ### Tiempo de Implementación / Despliegue:

  Considerando que se tiene NodeJS y MongoDB instalado, el tiempo de implementación es de 5 minutos aproximadamente, sin contar el tiempo que toma la instalación de los paquetes de npm necesarios para cada componente, ya que esto varía según la conexión a internet que se disponga.
  
-------------------------------------------

* ### Tecnologías Utilizadas:

  * NodeJS.
  * Express.
  * Pug Template Engine.
  * Bootstrap.
  * Material Icons (Material Design)
  * MongoDB.
  * Job Scheduler.

-------------------------------------------

* ### Paquetes npm utilizados:

  * async v2.1.5
  * axios v0.17.1
  * date-and-time v0.5.0
  * log4js v1.1.1
  * mongoose v4.7.0
  * node-schedule v1.2.4
  * cors v2.8.4
  * express v4.15.3
  * helmet v3.9.0
  * pug v2.0.0-rc.4
  * lodash v4.17.4

-------------------------------------------

* ### Contexto del Desarrollo:

  Pequeño desarrollo web que expone diversos conceptos básicos sobre el desarrollo de una aplicación web 100% NodeJS, construido en base a una arquitectura de desarrollo y diseño orientado al dominio, basado en un patrón de N-Capas DDD (Domain-Driven-Design), en donde el dominio es lo más importante de una aplicación, utilizando las tecnologías mencionadas anteriormente.
  
  Cita: "En este tipo de diseño orientado al dominio, lo dependiente de la tecnología reside en el exterior como si capas de una cebolla fueran, donde podemos sustituir una capa por otra, utilizando otra tecnología, y la funcionalidad de la aplicación no se ve comprometida" [link a la Fuente!](http://xurxodeveloper.blogspot.cl/2014/01/ddd-la-logica-de-dominio-es-el-corazon.html).
  
  Se aclara también que en este desarrollo se ha dejado de lado intencionalmente lo relacionado a seguridad SSL, Token, encriptación y seguridad de base de datos.
  
  La aplicación job schedule, internamente, y, una vez por minuto, se conecta a una API que entrega una lista de mensajes recientemente publicados:
  
  Api: http://hn.algolia.com/api/v1/search_by_date?query=nodejs
  
  Esta tarea la ejecuta un job programado para tal fin, donde obtiene los datos, procesa la información y deposita los datos necesarios en la base de datos MongoDB.
  
  El intervalo de ejecución del job puede ser modificado según se explica más adelante. (Se recomienda modificar dicho intervalo a un valor de 1 Hora).
  
  Por otro lado, la aplicación web, actualiza su vista de forma automática una vez por hora, actualizando el front-end automáticamente por cada hora.
  
  El usuario puede visualizar una página web en donde se muestran todas las publicaciones más recientes en orden de la fecha más actual, hasta la fecha más antigua.
  
  Cada publicación de la lista puede eliminarse de forma independiente, la eliminación no es física, es una eliminación lógica, dado a que no poseemos control sobre los datos que provee la API, de esta forma mantenemos el registro en base de datos a pesar que no se muestre en la página web pudiendo filtrar las publicaciones activas para nuestro desarrollo.
  
  Las fechas de las publicaciones fueron tratadas con un componente o módulo NodeJS que permite presentar los campos de fecha de una forma más entendible y bonita para la aplicación web.
  
  Además es posible seleccionar una publicación y ver su contenido en una nueva pestaña del navegador.

-------------------------------------------

* ### Requisitos de Software:

  * Sistema Operativo:
    * Windows 7 Ultimate SP1
  * NodeJS v6.9.1 x86 (o Superior)
  * npm v5.4.1 x86 (o Superior)
  * MongoDB v3.2.11 [mongodb-win32-x86_64-2008plus-ssl-3.2.11-signed.msi] (o Superior)
  
  ![001-RequisitosSoftware.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/001-RequisitosSoftware.JPG)
  
  ![002-RequisitosSoftware.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/002-RequisitosSoftware.JPG)
  
 -------------------------------------------

* ### Estructura y Descripción de Directorios:
  
  lo siguiente, explica cómo se compone la arquitectura del proyecto, y para qué sirve cada componente.
  
  ![003-EstructuraDirectorios.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/003-EstructuraDirectorios.JPG)
  
  * WebApp-ReignDesign\logs: 
    * Almacena los archivos de logs provenientes de las ejecuciones del Job y de Servidor de Aplicaciones y Rest.


* #### Job: Estructura y Descripción de Directorios:

  * WebApp-ReignDesign\Server.Jobs: 
    * Contiene el proyecto desarrollado como Job ejecutable según una frecuencia de horario configurada.
    
  * WebApp-ReignDesign\Server.Jobs\Job.ManageNewHits: 
    * Proyecto Job Programable.
    
  * WebApp-ReignDesign\Server.Jobs\Job.ManageNewHits\appconfig.json:
    * Contiene la configuración de parámetros del job, aquí se puede configurar:
      * URL de servicio web que se consume para poblar la base de datos mongodb.
      * Configuración de Base de Datos MongoDB (Ip, Puerto, Base de Datos y Pool de Conexiones).
      * Propiedades de log.
      * Propiedades de validación general.
      
  * WebApp-ReignDesign\Server.Jobs\Job.ManageNewHits\Job.Schedule.Config.js:
    * Contiene la configuración de parámetros de intervalos de tiempo en que se ejecutará el job, actualmente está configurado para ejecutarse una vez por cada minuto, asimismo se puede configurar para que se ejecute en el horario que se necesite.
    
  * WebApp-ReignDesign\Server.Jobs\Job.ManageNewHits\Job.Schedule.ManageNewHits.js:
    * Ejecutable del job.
    
    
* #### REST y WebApplication Server: Estructura y Descripción de Directorios:
  
  * WebApp-ReignDesign\Server.Rest:
    * Contiene el proyecto desarrollado como API Rest y WebApplication Server.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services:
    * Contiene los proyectos desarrollado como módulos NodeJS, proveen la lógica de Negocio en forma modular.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts:
    * Contiene el módulo NodeJS de servicio de negocio que gestiona todo lo relacionado a la interacción y el comportamiento referente a un negocio específico (en este caso, el módulo gestiona los posts existentes en base de datos, módulo desarrollado con arquitectura de N-Capas orientado al dominio.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.BLL:
    * Capa Lógica de Negocio.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.DAL:
    * Capa de Acceso a Datos.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.DTO:
    * Objetos de Transferencia de Datos.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.Exceptions:
    * Literales de Excepciones Controladas.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.Model:
    * Modelo de Datos.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Service.Util:
    * Literales de Utilitarios.
    
  * WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\Servicio.GestionPosts.js:
    * Constructor y Ejecutable de Módulo de Servicio .
  
  * WebApp-ReignDesign\Server.Rest\Server.Util:
    * Objetos de literales para el servidor NodeJS.
    
  * WebApp-ReignDesign\Server.Rest\webApp:
    * Contiene todos los objetos estáticos y dinámicos utilizados para renderizar la aplicación web.
  
  * WebApp-ReignDesign\Server.Rest\appconfig.json:
    * Contiene la configuración de parámetros del Servidor de Aplicaciones y Rest, aquí se puede configurar:
      * Configuración propia del servidor, como la IP, Puerto, Límites de parámetros en peticiones GET y máximo de transferencia de datos en consumo de API Rest.
      * Configuración de Base de Datos MongoDB (Ip, Puerto, Base de Datos y Pool de Conexiones).
      
  * WebApp-ReignDesign\Server.Rest\ServerExpress.js:
    * Ejecutable de Servidor Rest y Web Application. 


* #### Ejecución de la Aplicación - Descripción de Archivos:

  * WebApp-ReignDesign\JOBS - Start.Automatic.bat:
    * Permite arrancar una instancia única de NodeJS, el cual ejecuta por separado, los jobs configurados para iniciar según programación de horario establecida, corriendo en una consola independiente.
    
    ```bash
    node Start.Server.Jobs.js
    ```
    
  * WebApp-ReignDesign\REST - Start.Automatic.bat:
    * Permite arrancar una instancia única de NodeJS, el cual ejecuta por separado, la Aplicación Web y Api REST, corriendo en una consola independiente.
    
    ```bash
    node Start.Server.Rest.js
    ```
    
  * WebApp-ReignDesign\Start.Automatic.bat:
    * Permite arrancar en una única instancia de NodeJS, tanto la ejecución del Job Programado, la aplicación Web y la API Rest, corriendo en la misma consola.
    
    ```bash
    node Start.Servers.js
    ```
    
 * WebApp-ReignDesign\Start.MongoDB.Server.bat:
    * Permite arrancar y ejecutar el servidor de MongoDB, especificando la ruta del ejecutable de mongo y la ruta de los archivos que componen la base de datos.
    
    ```bash
    "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --port 27017 --dbpath C:\mongodb\data\reign-design-db
    ```
    
* WebApp-ReignDesign\Start.MongoDB.Client.bat:
    * Permite ejecutar una instancia del cliente de MongoDB.
    
    ```bash
    "C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe"
    ```
    
-------------------------------------------

* ### Instalación de paquetes / librerías npm:

  * 1: Clonar o descargar fuentes en cualquier directorio local.
  * 2: Iniciar instalación de paquetes o librerías npm en las siguientes rutas del proyecto:
  
    * \WebApp-ReignDesign\Server.Jobs\Job.ManageNewHits\
      Este proyecto es un Job programable, el cual se puede ejecutar de forma independiente a la aplicación
      ```bash
      C:\...> npm install --save
      ```
      Este comando instalará todas las dependencias necesarias para poder ejecutar el Job.
      
      
    * \WebApp-ReignDesign\Server.Rest\Server.Services\Servicio.GestionPosts\
            
      ```bash
      C:\...> npm install --save
      ```
    Este comando instalará todas las dependencias necesarias por el módulo de servicio de negocio.
    
    
    * \WebApp-ReignDesign\Server.Rest\
            
      ```bash
      C:\...> npm install --save
      ```
      Este comando instalará todas las dependencias necesarias para poder ejecutar el servidor NodeJS.

-------------------------------------------

* #### MongoBD - Preparación de Base de Datos:

  * 1: Instalar MongoDB (Versión indicada anteriormente) con las configuraciones predeterminadas en su instalador.
  * 2: Crear la siguiente ruta de directorios en el disco local C:
  
  ```bash
    C:\mongodb\data\reign-design-db
  ```
  * 3: Iniciar el servidor de Base de Datos, ejecutando el siguiente archivo:
    * WebApp-ReignDesign\Start.MongoDB.Server.bat
    
    ![004-EjecucionServidorMongo.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/004-EjecucionServidorMongo.JPG)
  
  * 4: (Opcional) Iniciar el cliente de Base de Datos, ejecutando el siguiente archivo:
    * WebApp-ReignDesign\Start.MongoDB.Client.bat
    * El cliente se conectará a nuestra base de datos, y podremos ver las bases de datos existentes:
    
    ![005-EjecucionClienteMongo.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/005-EjecucionClienteMongo.JPG)
  
    * Podremos observar que no existe base de datos más que la existente por defecto.
  
-------------------------------------------

* #### ¿Cómo poblar la base de datos y ejecutar el proyecto?:
  
  A continuación se presentan las dos maneras de iniciar la aplicación:
  
  * 1: Iniciar el Servidor NodeJS:
    * 1.1: Podremos ejecutar el siguiente archivos para iniciar la instancia de la aplicación NodeJS en una única consola:
      * WebApp-ReignDesign\Start.Automatic.bat: 
        * Esto iniciará toda la aplicación en una única consola.
           
    ![006-EjecucionAplicacionUnicaInstancia.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/006-EjecucionAplicacionUnicaInstancia.JPG)
    
    * 1.2: (Opcional) O bien, Podremos ejecutar los siguientes archivos para iniciar las instancias de la aplicación NodeJS por separado:
      * WebApp-ReignDesign\JOBS - Start.Automatic.bat
        * Sólo iniciará el Job programado de forma independiente a la aplicación.
        
        ![007-EjecucionJob.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/007-EjecucionJob.JPG)
        
      * WebApp-ReignDesign\REST - Start.Automatic.bat
        * Sólo iniciará la Aplicación Web y API Rest independiente del Job programado.
        
        ![008-EjecucionRestWebApp.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/008-EjecucionRestWebApp.JPG)
        
  * #### IMPORTANTE: 
  
    * El proyecto de Job es el encargado de crear la base de datos y de ir poblando la misma, con los datos de la API de Noticias.
    
    * Para poblar la base de datos, sólo debe esperar 1 minuto (que es el intervalo de tiempo configurado para la ejecución recurrente del Job) una vez iniciada la aplicación.
      
      ![009-PobladoBaseDatos.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/009-PobladoBaseDatos.JPG)
      
    * Siempre se debe ejecutar estas acciones, teniendo ya en ejecución el servidor de Base de Datos MongoDB.
          
    * Después de 1 minuto, podremos verificar la base de datos mediante el cliente de mongo, la existencia y los datos de la misma:
    
      ![010-VerificacionBaseDatos.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/010-VerificacionBaseDatos.JPG)
 
-------------------------------------------
 
 * #### Probar Api REST - Obtener Posts:
  
  Si la ejecución del Servidor y Aplicación NodeJS ha sido exitosa, podremos acceder a la siguiente URL para probar la API REST, y así obtener el JSON de respuesta al obtener todos los Posts existentes en base de datos, que fueron insertados por el proyecto Job Programado:
  
  * URL: http://127.0.0.1:9000/obtenerPosts
  
  ![011-VerificacionApiREST.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/011-VerificacionApiREST.JPG)
  
-------------------------------------------
  
 * #### Ejecución de la Aplicación Web:
 
  Si la ejecución del Servidor y Aplicación NodeJS ha sido exitosa, podremos acceder a la siguiente URL para acceder a la aplicación web:
  
  La aplicación web actualizará la vista de manera automática por cada hora.
  
  * URL: http://127.0.0.1:9000
  
  ![012-VerificacionAplicacionWeb-01.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-01.JPG)
  
  ![012-VerificacionAplicacionWeb-02.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-02.JPG)
  
  ![012-VerificacionAplicacionWeb-03.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-03.JPG)
  
  ![012-VerificacionAplicacionWeb-04.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-04.JPG)
  
  ![012-VerificacionAplicacionWeb-05.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-05.JPG)
  
  ![012-VerificacionAplicacionWeb-06.JPG](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-06.JPG)
  
-------------------------------------------
