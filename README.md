# NodeJS-ReignDesign-Test

Proyecto NodeJS que se compone de tres soluciones interoperables entre sí, de muy fácil despliegue y configuración, pero con una arquitectura robusta y mantenible por equipos o personas independientes. 

* Se componen de: 
  * Aplicación Web.
  * Api REST.
    * Módulo desarrollado con arquitectura de N-Capas orientado al dominio.
  * Jobs (programables de ejecución independiente a toda la aplicación). 
    * módulo desarrollado con arquitectura de N-Capas orientado al dominio.
  
Proyecto desarrollado - NodeJs Developer Test 2018 

[By José Alfredo Trujillo Hidalgo]

-------------------------------------------

* ### Requisitos de Software:

  * Sistema Operativo:
    * Windows 7 Ultimate SP1
  * NodeJS v6.9.1 x86 (o Superior)
  * npm v5.4.1 x86 (o Superior)
  * MongoDB v3.2.11 [mongodb-win32-x86_64-2008plus-ssl-3.2.11-signed.msi] (o Superior)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/001-RequisitosSoftware.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/002-RequisitosSoftware.JPG)
  
 -------------------------------------------

* ### Estructura y Descripción de Directorios:
  
  lo siguiente, explica cómo se compone la arquitectura del proyecto, y para qué sirve cada componente.
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/003-EstructuraDirectorios.JPG)
  
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
    
    ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/004-EjecucionServidorMongo.JPG)
  
  * 4: (Opcional) Iniciar el cliente de Base de Datos, ejecutando el siguiente archivo:
    * WebApp-ReignDesign\Start.MongoDB.Client.bat
    * El cliente se conectará a nuestra base de datos, y podremos ver las bases de datos existentes:
    
    ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/005-EjecucionClienteMongo.JPG)
  
    * Podremos observar que no existe base de datos más que la existente por defecto.
  
-------------------------------------------

* #### ¿Cómo poblar la base de datos y ejecutar el proyecto?:
  
  A continuación se presentan las dos maneras de iniciar la aplicación:
  
  * 1: Iniciar el Servidor NodeJS:
    * 1.1: Podremos ejecutar el siguiente archivos para iniciar la instancia de la aplicación NodeJS en una única consola:
      * WebApp-ReignDesign\Start.Automatic.bat: 
        * Esto iniciará toda la aplicación en una única consola.
           
    ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/006-EjecucionAplicacionUnicaInstancia.JPG)
    
    * 1.2: (Opcional) O bien, Podremos ejecutar los siguientes archivos para iniciar las instancias de la aplicación NodeJS por separado:
      * WebApp-ReignDesign\JOBS - Start.Automatic.bat
        * Sólo iniciará el Job programado de forma independiente a la aplicación.
        
        ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/007-EjecucionJob.JPG)
        
      * WebApp-ReignDesign\REST - Start.Automatic.bat
        * Sólo iniciará la Aplicación Web y API Rest independiente del Job programado.
        
        ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/008-EjecucionRestWebApp.JPG)
        
  * #### IMPORTANTE: 
  
    * El proyecto de Job es el encargado de crear la base de datos y de ir poblando la misma, con los datos de la API de Noticias.
    
    * Para poblar la base de datos, sólo debe esperar 1 minuto (que es el intervalo de tiempo configurado para la ejecución recurrente del Job) una vez iniciada la aplicación.
      
      ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/009-PobladoBaseDatos.JPG)
      
    * Siempre se debe ejecutar estas acciones, teniendo ya en ejecución el servidor de Base de Datos MongoDB.
          
    * Después de 1 minuto, podremos verificar la base de datos mediante el cliente de mongo, la existencia y los datos de la misma:
    
      ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/010-VerificacionBaseDatos.JPG)
 
-------------------------------------------
 
 * #### Probar Api REST - Obtener Posts:
  
  Si la ejecución del Servidor y Aplicación NodeJS ha sido exitosa, podremos acceder a la siguiente URL para probar la API REST, y así obtener el JSON de respuesta al obtener todos los Posts existentes en base de datos, que fueron insertados por el proyecto Job Programado:
  
  * URL: http://127.0.0.1:9000/obtenerPosts
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/011-VerificacionApiREST.JPG)
  
-------------------------------------------
  
 * #### Ejecución de la Aplicación Web:
 
  Si la ejecución del Servidor y Aplicación NodeJS ha sido exitosa, podremos acceder a la siguiente URL para acceder a la aplicación web:
 
  * URL: http://127.0.0.1:9000
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-01.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-02.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-03.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-04.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-05.JPG)
  
  ![alt text](https://github.com/jtrujilloh/NodeJS-ReignDesign-Test/blob/master/Imagenes/012-VerificacionAplicacionWeb-06.JPG)
  
-------------------------------------------
