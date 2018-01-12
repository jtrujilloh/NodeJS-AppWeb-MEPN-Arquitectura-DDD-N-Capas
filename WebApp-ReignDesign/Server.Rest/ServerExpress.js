function serverStart(){

	const log4js = require('log4js');
	log4js.loadAppender('file');
	log4js.addAppender(log4js.appenders.file('logs/Rest.Server.log'), 'RestServer');
	const logger = log4js.getLogger('RestServer');

	//DEPENDENCIA: Util
	const utilServerLog = require("./Server.Util/Literals.Log/serverConsoleLog");

	logger.info("*****************************************************");
	logger.info(utilServerLog.ServerLog.Starting + "API REST - ReignDesign: ...");

	logger.info(utilServerLog.ServerLog.Loading + "SERVER PARAMETERS: ...");
	const Server_Params = require("./package.json");
	const Server_Config = require("./appconfig.json");
	logger.info(utilServerLog.ServerLog.Loaded + "SERVER PARAMETERS: OK");

	const axios = require("axios");
	const datetime = require("date-and-time");
	const express = require("express");
	const bodyParser = require('body-parser');
	const mongoose = require("mongoose");
	const cors = require('cors');
	const helmet = require('helmet');
	const url = require("url");

	const http = require('http');
	const fs = require("fs");

	const path = require('path');

	//DEPENDENCIAS EXTERNAS: Servicios
	const servicioGestionPosts = require("./Server.Services/Servicio.GestionPosts/Servicio.GestionPosts");

	//DEPENDENCIA: DTO's
	const responseDTO = require("./Server.DTO/Response/responseDTO");
	const publicOperationsDTO = require("./Server.DTO/Operations/publicOperationsDTO");

	logger.info(utilServerLog.ServerLog.Starting + "Servidor - ReignDesign: ...");

				const Server = express();

				Server.use(bodyParser.urlencoded({
					parameterLimit: Server_Config.Server.ParametersOnGetRequestLimit,
					limit: Server_Config.Server.BandwidthLimit,
					extended: Server_Config.Server.Extended
				}));
				Server.use(bodyParser.json());

				Server.set('views', path.join(__dirname, 'webApp'));
				Server.set('view engine', 'pug');
				Server.use(express.static(path.join(__dirname, '/webApp')));

				Server.use(cors());
				Server.use(helmet());
				Server.set('IP', Server_Config.Server.IP);
				Server.set('PORT', Server_Config.Server.Port);

				const publicRouter = express.Router();

				publicRouter.get(publicOperationsDTO.Operaciones.Root, function(request, response) {

					const res = response;
					axios.get("http://" + Server.get('IP') + ':' + Server.get('PORT') + publicOperationsDTO.Operaciones.ServicioGestionPosts.getPosts)
				    .then(function (response) {
				      //logger.trace(response.data.Response);

							res.render('index', {
								title: 'HN Feed',
								subTitle: 'We <3 hacker news!',
								hits: response.data.Response.DataOut,
								footerTitle: '- NodeJS Developer Test 2018 -',
								footerVersion: Server_Params.version,
								footerAuthor: Server_Params.author
							});

				    })
				    .catch(function (error) {
				      logger.error(error);
				    });

				});

				publicRouter.get(publicOperationsDTO.Operaciones.ServicioGestionPosts.getPosts, function(request, response){

					try {
						logger.info("-----------------------------------------------------");
						logger.info("[SERVER][NUEVO REQUERIMIENTO ENTRANTE ...]");
						const fechaHoy = new Date();
						let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');
						logger.info("[START DATE]: " + fechaHoy_formatted);
						logger.info("[REQUEST METHOD]: " + request.method + "");

						let ServicioGestionPosts = new servicioGestionPosts(Server_Config, response);
						ServicioGestionPosts.obtenerPosts(logger);

					} catch (ex) {
						//ERROR: GENERAL
						let j = preRespDTO;
						j.CodigoHTTP = 500;
						j.MensajeInterno = "ERROR";
						j.MensajeServicio = "El servidor no puede y no procesará la solicitud debido a un error grave (ERROR: " + ex.toString() + ")";

						let JSONResponse = GENERA_RESPONSE_ERROR(response, j.CodigoHTTP, j.MensajeInterno, j.MensajeServicio);

						response.writeHead(j.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
						response.write(JSONResponse);
						response.end();

						logger.fatal("ERROR: " + ex.toString());
					}
				});

				publicRouter.post('/eliminarPost', function(request, response){

					console.log("RECIBIDO [POST]: ");
					console.log(request.body.story_id);

					try {
						logger.info("-----------------------------------------------------");
						logger.info("[SERVER][NUEVO REQUERIMIENTO ENTRANTE ...]");
						const fechaHoy = new Date();
						let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');
						logger.info("[START DATE]: " + fechaHoy_formatted);
						logger.info("[REQUEST METHOD]: " + request.method + "");

						let ServicioGestionPosts = new servicioGestionPosts(Server_Config, response);
						ServicioGestionPosts.eliminarPost(logger, request.body.story_id);

					} catch (ex) {
						//ERROR: GENERAL
						let j = preRespDTO;
						j.CodigoHTTP = 500;
						j.MensajeInterno = "ERROR";
						j.MensajeServicio = "El servidor no puede y no procesará la solicitud debido a un error grave (ERROR: " + ex.toString() + ")";

						let JSONResponse = GENERA_RESPONSE_ERROR(response, j.CodigoHTTP, j.MensajeInterno, j.MensajeServicio);

						response.writeHead(j.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
						response.write(JSONResponse);
						response.end();

						logger.fatal("ERROR: " + ex.toString());
					}

				});

				publicRouter.get('/eliminarPost/:story_id', function(request, response){

					console.log("RECIBIDO: ");
					console.log(request.params.story_id);

					response.redirect('/');

				});

				Server.use(publicRouter);

				http.createServer(Server).listen(Server.get('PORT'), function() {
				  logger.info(utilServerLog.ServerLog.Info + "Servidor HTTP: NodeJS - Rest ReignDesign [v" + Server_Params.version + "]: ...");
				  logger.info(utilServerLog.ServerLog.Started + "*** OK ***");
				  logger.info(utilServerLog.ServerLog.Info + "API RESTfull is running and listening at http://%s:%s", Server.get('IP'), Server.get('PORT'));
				  logger.info("*****************************************************");
				});

	function GENERA_RESPONSE_ERROR(response, CodigoHTTP, MensajeInterno, MensajeServicio){
		let r = responseDTO;
		logger.info(utilServerLog.ResponseLog.Error + "GENERANDO RESPONSE ...");
		let fechaHoy = new Date();
		let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

		r.Response.Info.FechaHora = fechaHoy_formatted;

		r.Response.Resultado.Codigo = 1
		r.Response.Resultado.OrigenMensaje = "[SERVIDOR]"
		r.Response.Resultado.CodigoHTTP = CodigoHTTP;
		r.Response.Resultado.MensajeInterno = MensajeInterno;
		r.Response.Resultado.MensajeServicio = MensajeServicio;

		return JSON.stringify(r);
	};

	function getStringConnection_MongoDB(){
		return Server_Config.MongoDBServer.IP + ":" + Server_Config.MongoDBServer.PORT + "/" + Server_Config.MongoDBServer.BBDD;;
	};
}

exports.start = serverStart;
