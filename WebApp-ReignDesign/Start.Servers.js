const ApiServer =  require("./Config.Rest");
const JobsServer =  require("./Config.Jobs");

/* API - Rest */
ApiServer.Rest.Express.Normal.start();
//ApiServers.Rest.Express.SSL.start();

/* Jobs - Schedules */
JobsServer.JobSchedules.ManageNewHits.Job.start();
