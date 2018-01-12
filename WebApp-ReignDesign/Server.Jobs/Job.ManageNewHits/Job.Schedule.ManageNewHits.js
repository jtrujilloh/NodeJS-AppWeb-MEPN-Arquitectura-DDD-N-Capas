const log4js_schedule = require('log4js');
log4js_schedule.loadAppender('file');
log4js_schedule.addAppender(log4js_schedule.appenders.file('logs/Job.ManageNewHits.log'), 'JobManageNewHits');
const logger = log4js_schedule.getLogger('JobManageNewHits');

/*
logger.trace('');
logger.debug('');
logger.info('');
logger.warn('');
logger.error('');
logger.fatal('');
*/

const mongoose = require("mongoose");
const schedule = require('node-schedule');
const datetime = require("date-and-time");
const task_Config = require('./Job.Schedule.Config');

const logHeader_Job = '[Job.Schedule.ManageNewHits]: ';
const logHeader_ManageNewHits = '[JOB][ManageNewHits]: ';

logger.info(logHeader_Job + "Iniciando Tareas Programadas...");

const job_AppConfig = require("./appconfig.json");
const job_AppPackage = require("./package.json");

//DEPENDENCIA: Exceptions
const job_ExceptionsMessages = require("./Job.Schedule.Exceptions/Literals/Messages");
//DEPENDENCIA: Util
const job_UtilMessages = require("./Job.Schedule.Util/Literals/Messages");
//DEPENDENCIA: BLL
const manageNewHitsBO = require("./Job.Schedule.BLL/ManageNewHitsBO");

function jobProcessStart(){

  var job_ManageNewHits = schedule.scheduleJob(task_Config.getRule_JobManageNewHits(), function(){
    let fechaHoy = new Date()
    let fechaHoy_formatted = datetime.format(fechaHoy, 'DD-MM-YYYY - HH:mm:ss');
    //logger.info("*****************************************************");
    logger.info(logHeader_ManageNewHits + fechaHoy_formatted);
    execute_ManageNewHits(logger);
    logger.info("*****************************************************");
  });

};

logger.info(logHeader_Job + "Inicio de Tareas Programadas: OK");
logger.info(logHeader_Job + "Job's a la espera de ser ejecutados según programación configurada...");

exports.start = jobProcessStart;

function execute_ManageNewHits(logger){
  var strResultado;

  try {

    var options = {
      useMongoClient: job_AppConfig.MongoDBServer.Options.useMongoClient,
      autoIndex: job_AppConfig.MongoDBServer.Options.autoIndex,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: job_AppConfig.MongoDBServer.Options.reconnectInterval,
      poolSize: job_AppConfig.MongoDBServer.Options.poolSize,
      bufferMaxEntries: job_AppConfig.MongoDBServer.Options.bufferMaxEntries
    };

    mongoose.connect(getStringConnection_MongoDB(job_AppConfig), options, function(err) {
  		if (err){
  			logger.error(job_ExceptionsMessages.Strings.ErrorConexionBBDDMongo + err);
  		} else {
  			logger.info(job_ExceptionsMessages.Strings.OKConexionBBDDMongo);
        manageNewHitsBO.manageHits(logger, job_AppConfig, job_AppPackage, job_UtilMessages, job_ExceptionsMessages);
  		}
  		logger.info("*****************************************************");
  	});

	} catch (ex) {
		logger.error(logHeader_ManageNewHits + ex.toString());
	}
};

function getStringConnection_MongoDB(App_Config){
	return App_Config.MongoDBServer.IP + ":" + App_Config.MongoDBServer.PORT + "/" + App_Config.MongoDBServer.BBDD;
};
