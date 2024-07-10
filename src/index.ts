import express from "express";
import router from "./routes";
import config from "./config";
import { genericErrorHandler, notFound } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";
const app = express();
//parse json
app.use(express.json());
//handle routing
app.use(requestLogger);
app.use(router);
app.use(notFound);
app.use(genericErrorHandler);
//listen to port
app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
