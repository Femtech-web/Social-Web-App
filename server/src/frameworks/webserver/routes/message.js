import findAllMessage from "../../database/mongoDB/repositories/postRepositoryMongoDB";

export default function messageRouter(express) {
  const router = express.Router();

  router.route("/").get(async () => {
    const allMessage = await findAllMessage();
    res.status(200).json(allMessage);
  });
}
