import express from "express";
import router from "./routes";
import config from "./config";
const app = express();
//parse json
app.use(express.json());
//handle routing
app.use(router);
//listen to port
app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
