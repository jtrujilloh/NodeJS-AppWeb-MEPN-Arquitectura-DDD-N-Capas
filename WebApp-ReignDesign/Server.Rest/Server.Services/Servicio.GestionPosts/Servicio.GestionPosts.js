const mongoose = require("mongoose");

const service_AppConfigPackage = require("./appconfig.json");
const service_ConfigPackage = require("./package.json");

//DEPENDENCIA: Util
const service_UtilMessages = require("./Service.Util/Literals/Messages");
//DEPENDENCIA: BLL
const postsBO = require("./Service.BLL/PostsBO");
//DEPENDENCIA: DTO
const responseDTO = require("./Service.DTO/Response/responseDTO");
//DEPENDENCIA: TokenService + authMiddleware

const ServicioGestionPosts = function(Server_Config, response){
	this.Server_Config = Server_Config;
	this.response = response;
	this.App_Config = service_AppConfigPackage;
	this.Service_Params = service_ConfigPackage;
	this.Util_Messages = service_UtilMessages;

	const mongoDbOptions = {
		useMongoClient: this.Server_Config.MongoDBServer.Options.useMongoClient,
		autoIndex: this.Server_Config.MongoDBServer.Options.autoIndex,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: this.Server_Config.MongoDBServer.Options.reconnectInterval,
		poolSize: this.Server_Config.MongoDBServer.Options.poolSize,
		bufferMaxEntries: this.Server_Config.MongoDBServer.Options.bufferMaxEntries
	};

	mongoose.connect(getStringConnection_MongoDB(this.Server_Config), mongoDbOptions, function(err) {
		if (err){
			console.log("Ha ocurrido un error al tratar de conectarse a la base de datos: " + err);
		} else {
			console.log("Conexión a la base de datos: OK");
		}
		console.log("*****************************************************");
	});

};

ServicioGestionPosts.prototype.obtenerPosts = function(logger) {
	try {

		postsBO.obtenerPosts(logger, this.response, this.App_Config, this.Service_Params, this.Util_Messages);

	} catch (ex) {
		console.log("[SERVICIO]: ERROR THROWED: " + ex.toString());
		throw new Error(ex.message);
	}
};

ServicioGestionPosts.prototype.eliminarPost = function(logger, story_id) {
	try {

		postsBO.eliminarPost(logger, this.response, this.App_Config, this.Service_Params, this.Util_Messages, story_id);

	} catch (ex) {
		console.log("[SERVICIO]: ERROR THROWED: " + ex.toString());
		throw new Error(ex.message);
	}
};

function getStringConnection_MongoDB(App_Config){
	return App_Config.MongoDBServer.IP + ":" + App_Config.MongoDBServer.PORT + "/" + App_Config.MongoDBServer.BBDD;
};

module.exports = ServicioGestionPosts;
