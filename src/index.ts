import express from "express";
import router from "./routes";
import config from "./config";
import { genericErrorHandler, notFound } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";
const app = express();
//parse json
app.use(express.json());
//show request logs
app.use(requestLogger);
//handle routing
app.use(router);
//handle not found for the unknown endpoints
app.use(notFound);
//handle custom error middleware--> all the errors go through this
app.use(genericErrorHandler);
//listen to port
app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
