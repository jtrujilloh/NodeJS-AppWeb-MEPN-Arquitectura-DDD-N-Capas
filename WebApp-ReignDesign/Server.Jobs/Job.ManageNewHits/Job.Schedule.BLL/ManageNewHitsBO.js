//DEPENDENCIA: API's'
const mongoose = require("mongoose");
const async = require("async");
//const datetime = require("node-datetime");
const datetime = require("date-and-time");
const formatCurrency = require('format-currency')
const optionsFormatter = { format: '%s%v', symbol: '$', locale: 'es-CL', minFraction: 0, maxFraction: 2 };

//DEPENDENCIA: DAL
const getHitsDAO = require("../Job.Schedule.DAL/GetHitsFromApiDAO");
const hitsDAO = require("../Job.Schedule.DAL/HitsDAO");

exports.manageHits = manageHits;

function manageHits(logger, job_AppConfig, job_AppPackage, job_UtilMessages, job_ExceptionsMessages){
	logger.info("[B.L.L.][ManageNewHitsBO.js]");
	var strResultado;
	var JSONResponse;

				async.waterfall([
					function(callback) { //Realiza Invocación de API, Obtiene nuevos post
						logger.info(job_UtilMessages.Strings.InvokeAPI + job_AppConfig.API.dataProvider);
						getHitsDAO.getDataFromApiGET(logger, callback, job_AppConfig);
					},
					function(serviceResponse, callback) { //Realiza tratamiento de datos según restricciones impuestas
						if (serviceResponse.length === 0) {
							callback(job_ExceptionsMessages.ValidationConstants.SinInformacion, null);
							return;
						}

						const fechaHoy = new Date();

						logger.info(job_UtilMessages.Strings.StartDataProcess);

						logger.trace(job_UtilMessages.Strings.CountHits + serviceResponse.hits.length);

						async.forEachOf(serviceResponse.hits, function(hit, index, eachCallback) { // Tratamiento en paralelo de cada hit obtenido

							//logger.trace("story_id: " + hit.story_id);

							try {
								async.waterfall([
									function(wCallback) { //Obtiene hit según story_id, para verificr su existencia y no ingresarlo en base de datos.
										//logger.trace("Buscando por story_id: " + hit.story_id);
										if (hit.story_id) {
											hitsDAO.GET_HIT_BY_STORY_ID(logger, wCallback, job_AppConfig,
																									hit.story_id)
										} else {
											wCallback('story_id: ' + hit.story_id + ' - Hit No Válido', null);
										}

									},
									function(existentHit, wCallback) { //Valida la existencia del hit en base de datos.
										if (!existentHit) {
											logger.info("story_id: " + hit.story_id + " No existe en base de datos.");
											logger.info(job_UtilMessages.Strings.SaveHitOnDb);

											hitsDAO.INSERT_NEW_HIT(logger, wCallback, job_AppConfig,
																						hit);

										} else {
											wCallback("story_id: " + hit.story_id + " ya existe en base de datos, éste objeto se omitirá.", null);
										}
									}
									],
									function(err, results) {
										if (err) {
											logger.warn(job_ExceptionsMessages.Strings.AlertaProcesarObjetoDatos + err);
											eachCallback();
										} else {
											logger.info("Story ID: " + hit.story_id + "; Almacenado correctamente!");
											eachCallback();
										}
								});
							} catch (ex) {
								//RESPONSE: ERROR
								logger.error(job_ExceptionsMessages.Strings.ErrorInesperadoObjetoDato + ex.toString());
								logger.trace(hit);
								eachCallback();
							}
						}, function(err) {
						    if( err ) {
						      logger.error(job_ExceptionsMessages.Strings.DetenerProcesamientoObjeto);
									callback(err, null);
						    } else {
						      logger.info(job_UtilMessages.Strings.TodoOk);
									callback(null, 'OK');
						    }
						});
					}
        ],
				function(err, results) {
					logger.info("Cerrando conexiones de base de datos ...");
					mongoose.connection.close();
					logger.info("Conexiones de base de datos cerradas: OK...");
					
					if(err){
						logger.error("[B.L.L.][ManageNewHitsBO.js]: " + job_AppConfig.ValidationProperties.ERROR + ': ' + err);
          } else {
						logger.info("[B.L.L.][ManageNewHitsBO.js]: " + job_AppConfig.ValidationProperties.EXITO + ': ' + job_UtilMessages.Strings.ManageHintsFinishOK);
          }
				});
};
