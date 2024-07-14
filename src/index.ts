import express from "express";
import config from "./config";

import { expressStarter } from "./utils/express";
const app = express();
expressStarter(app);
//listen to port
app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
