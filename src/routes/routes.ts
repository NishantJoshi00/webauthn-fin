import express from "express";
import { handleError } from "../middleware/errorHandler";
import config from "../../config.json";
import {
  handleRegisterStart,
  handleRegisterFinish,
} from "../controllers/registration";
import {
  handleLoginStart,
  handleLoginFinish,
} from "../controllers/authentication";

const router = express.Router();

if (process.env.ALLOW_REGISTER || config.ALLOW_REGISTER) {
  router.post("/registerStart", handleRegisterStart);
  router.post("/registerFinish", handleRegisterFinish);
}

router.post("/loginStart", handleLoginStart);
router.post("/loginFinish", handleLoginFinish);

router.post("/logout", (req, res) => {
  req.session.currentChallenge = undefined;
  req.session.loggedInUserId = undefined;
  res.status(200).json({ message: "Logged out" });
});

router.use(handleError);

export { router };
