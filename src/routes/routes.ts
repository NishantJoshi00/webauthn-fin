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
import { clearCredentials, clearUsers } from "../file";



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

router.post("/nuke", async (req, res) => {
  const API_KEY = req.headers["x-api-key"];

  const assetApiKey = process.env.API_KEY || "test_admin";

  if (API_KEY !== assetApiKey) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await clearUsers();
  await clearCredentials();

})

router.use(handleError);

export { router };
