import authServiceImpl from "../../services/authService";
import authServiceInterface from "../../../application/services/authServiceInterface";
import AppError from "../../services/appError";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const isCustomToken = token.length < 500;
  const authService = authServiceInterface(authServiceImpl());

  if (!token) {
    throw new AppError("No access token found", 403);
  }

  if (authHeader.split(" ")[0] !== "Bearer") {
    throw new AppError("Invalid access token format", 400);
  }

  try {
    let decodedToken;

    if (token) {
      if (isCustomToken) {
        decodedToken = authService.verify(token);
        req.user = decodedToken.user;
      } else {
        decodedToken = jwt.decode(token);
        req.user = decodedToken?.sub;
      }
    }

    next();
  } catch (error) {
    throw new AppError("Token is not valid", 400);
  }
}
