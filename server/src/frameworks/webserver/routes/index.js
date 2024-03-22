import postRouter from "./post";
import userRouter from "./user";
import authRouter from "./auth";
import messageRouter from "./message";

export default function routes(app, express, redisClient) {
  app.use("/api/v1/posts", postRouter(express, redisClient));
  app.use("/api/v1/users", userRouter(express, redisClient));
  app.use("/api/v1/login", authRouter(express, redisClient));
  app.use("/api/v1/messages", messageRouter(express, redisClient));
}
