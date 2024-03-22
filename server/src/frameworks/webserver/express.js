// import cors from 'cors';
import hpp from "hpp";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

export default function expressConfig(app, cors) {
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    }),
  );

  // SECURITY SETUP
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(morgan("combined"));
  app.use(hpp());
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    standardHeaders: "draft-7",
    message: "Too many request from this IP, Please try again in 15 mins.",
  });
  app.use("/api", limiter);

  // HEALTH CHECK
  app.get("/", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Everything is good!",
    });
  });
}
