import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// utilities
import { logger } from "./utils/logger.util.js";
import { dbConnection } from "./database/db.controller.js";
import { routes } from "./routes/server.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: [
      "https://orage-remote-nngu.vercel.app",
      "http://localhost:4200",
      "http://remote.ultimateitsolution.site",
      "http://remote.arjit.tech",
      "http://139.59.12.225"
    ],
  }),
);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  logger.info(`Server started at port ${PORT}`, {
    meta: {
      method: "app.listen",
    },
  });
  dbConnection(process.env.MONGO_DB_URI);

});

routes(app);
