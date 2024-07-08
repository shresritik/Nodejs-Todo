import express from "express";
import router from "./routes";
import config from "./config";
const app = express();
app.use(express.json());
app.use(router);
app.listen(config.port, () => {
  console.log(`Server is listeneing at ${config.port}`);
});
