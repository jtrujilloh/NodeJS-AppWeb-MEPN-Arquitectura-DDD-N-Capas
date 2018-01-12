const mongoose = require("mongoose");

const async = require("async");
const _ = require("lodash");

const datetime = require("date-and-time");
//DEPENDENCIA: DAL
const postsDAO = require("../Service.DAL/PostsDAO");
//DEPENDENCIA: DTO
const responseDTO = require("../Service.DTO/Response/responseDTO");

exports.obtenerPosts = obtenerPosts;
exports.eliminarPost = eliminarPost;

function obtenerPosts(logger, response, App_Config, Service_Params, Util_Messages){
	logger.info("[B.L.L.][PostsBO.js] obtenerPosts");

						async.waterfall([
							function(callback) {

									logger.info("Ejecutando Consulta: OBTENER_POSTS");

									postsDAO.OBTENER_POSTS(callback,
													App_Config, Service_Params, Util_Messages);

							},
							function(data, callback) {

								let dataFiltered = _.filter(data, function(o) {
									return (o.title != null || o.story_title != null);
								});

								let prettyData = _.forEach(dataFiltered, function(value, key) {
									let newDate = new Date(value.created_at);
									//datetime.setLocales('es', {
									//    A: ['AM', 'PM']
									//});
									datetime.locale('es');

									value.pretty_date = datetime.format(newDate, 'dddd, D MMMM YYYY h:m A');

									//console.log(value);
									return value;
								});

								callback(null, prettyData);

							},
						],
						function(err, results) {
							logger.info("Cerrando conexiones de base de datos ...");
							mongoose.connection.close();
							logger.info("Conexiones de base de datos cerradas: OK...");

							if(err){
								let errorJSON = JSON.parse(err);
								logger.info("Async ERROR: " + errorJSON.Response.Resultado.MensajeServicio);

								response.writeHead(errorJSON.Response.Resultado.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
								response.write(err);
								response.end();
							} else {

								let JSONResponse = GENERA_RESPONSE_OK("obtenerPosts", results, App_Config.ValidationProperties.EXITO);

								response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
								response.write(JSONResponse);
								response.end();
							}
						});

};

function eliminarPost(logger, response, App_Config, Service_Params, Util_Messages, story_id){
	logger.info("[B.L.L.][PostsBO.js] eliminarPost");

						async.waterfall([
							function(callback) {

									logger.info("Ejecutando Consulta: ELIMINAR_POST");

									postsDAO.ELIMINAR_POST(callback,
													App_Config, Service_Params, Util_Messages, story_id);

							}
						],
						function(err, results) {
							logger.info("Cerrando conexiones de base de datos ...");
							mongoose.connection.close();
							logger.info("Conexiones de base de datos cerradas: OK...");

							if(err){
								let errorJSON = JSON.parse(err);
								logger.info("Async ERROR: " + errorJSON.Response.Resultado.MensajeServicio);

								response.writeHead(errorJSON.Response.Resultado.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
								response.write(err);
								response.end();
							} else {

								let JSONResponse = GENERA_RESPONSE_OK("eliminarPost", results, App_Config.ValidationProperties.EXITO);

								response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
								response.write(JSONResponse);
								response.end();
							}
						});

};

function GENERA_RESPONSE_OK(Operacion, data_JSON, mensajeServicio) {
	let r = responseDTO;
	console.log("[.DAL][OK]: [GENERANDO RESPONSE]");
	let fechaHoy = new Date();
	let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

	r.Response.Header.NombreOperacion = Operacion;
	r.Response.Info.FechaHora = fechaHoy_formatted;
	r.Response.Info.RequestMethod = '';
	r.Response.DataOut = data_JSON;

	r.Response.Resultado.Codigo = 0
	r.Response.Resultado.OrigenMensaje = "[SERVICIO]"
	r.Response.Resultado.CodigoHTTP = 200;
	r.Response.Resultado.MensajeInterno = mensajeServicio;
	r.Response.Resultado.MensajeServicio = "La operacion se ha ejecutado exitosamente.";

	return JSON.stringify(r);
};

function GENERA_RESPONSE_ERROR(CodigoHTTP, request_method, Operacion, MensajeInterno, MensajeServicio) {
	let r = responseDTO;
	console.log("[SERVICE][ERROR]: [GENERANDO RESPONSE]");
	let fechaHoy = new Date();
	let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

	r.Response.Header.NombreOperacion = Operacion;
	r.Response.Info.FechaHora = fechaHoy_formatted;
	r.Response.Info.RequestMethod = request_method;
	r.Response.DataOut = {};

	r.Response.Resultado.Codigo = 1
	r.Response.Resultado.OrigenMensaje = "[SERVICIO]"
	r.Response.Resultado.CodigoHTTP = CodigoHTTP;
	r.Response.Resultado.MensajeInterno = MensajeInterno;
	r.Response.Resultado.MensajeServicio = MensajeServicio;

	return JSON.stringify(r);
};
