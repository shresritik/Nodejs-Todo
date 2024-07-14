import express from "express";
import { requestLogger } from "../middleware/logger";
import router from "../routes";
import { genericErrorHandler, notFound } from "../middleware/errorHandler";
import { Express } from "express-serve-static-core";
export function expressStarter(app: Express) {
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
}
