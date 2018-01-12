const datetime = require("date-and-time");

const responseDTO = require("../Service.DTO/Response/responseDTO");
const preRespDTO = require("../Service.DTO/Response/preResponseDTO");

const hitsModel = require("../Service.Model/Hits.Model");

exports.OBTENER_POSTS = OBTENER_POSTS;
exports.ELIMINAR_POST = ELIMINAR_POST;

function OBTENER_POSTS(callback, App_Config, Service_Params, Util_Messages){
	console.log("[D.A.L.][PostsDAO.js][OPERATION]: OBTENER_POSTS");
	let JSONResponse;

	let query = { status: true };

	hitsModel.find(query, function(err, hits) {
		if (!err) {
			callback(null, hits);
		} else {
			let j = preRespDTO;
			j.CodigoHTTP = 400;
			j.MensajeInterno = App_Config.ValidationProperties.ERROR;
			j.MensajeServicio = Util_Messages.Strings.ErrorConexionBBDDOracle + " (ERROR: " + err.message + ")";

			JSONResponse = GENERA_RESPONSE_ERROR(j.CodigoHTTP, '', j.MensajeInterno, j.MensajeServicio);

			callback(JSONResponse, null);
		}
	}).sort({created_at: -1});
};

function ELIMINAR_POST(callback, App_Config, Service_Params, Util_Messages, storyId){
	console.log("[D.A.L.][PostsDAO.js][OPERATION]: ELIMINAR_POST");
	let JSONResponse;

	let hitEdit = {
		status: false
	};

	let query = {story_id: storyId};

	hitsModel.update(query, hitEdit, {multi: true}, function(err) {
		if (!err) {
			callback(null, 'OK');
		} else {
			let j = preRespDTO;
			j.CodigoHTTP = 400;
			j.MensajeInterno = App_Config.ValidationProperties.ERROR;
			j.MensajeServicio = Util_Messages.Strings.ErrorConexionBBDDOracle + " (ERROR: " + err.message + ")";

			JSONResponse = GENERA_RESPONSE_ERROR(j.CodigoHTTP, '', j.MensajeInterno, j.MensajeServicio);

			callback(JSONResponse, null);
		}
	});
};

function GENERA_RESPONSE_ERROR(CodigoHTTP, Operacion, MensajeInterno, MensajeServicio) {
	let r = responseDTO;
	console.log("[SERVICE][ERROR]: [GENERANDO RESPONSE]");
	let fechaHoy = new Date();
	let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

	r.Response.Header.NombreOperacion = Operacion;
	r.Response.Info.FechaHora = fechaHoy_formatted;
	r.Response.Info.RequestMethod = '';
	r.Response.Data.BodyData = {};

	r.Response.Resultado.Codigo = 1
	r.Response.Resultado.OrigenMensaje = "[SERVICIO]"
	r.Response.Resultado.CodigoHTTP = CodigoHTTP;
	r.Response.Resultado.MensajeInterno = MensajeInterno;
	r.Response.Resultado.MensajeServicio = MensajeServicio;

	return JSON.stringify(r);
};
