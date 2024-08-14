import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import config from "../config.json";
import { router as passkeyRoutes } from "./routes/routes";
import session from "express-session";

const app: Express = express();

declare module "express-session" {
  interface SessionData {
    currentChallenge?: string;
    loggedInUserId?: string;
  }
}

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/
app.set("json spaces", 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    // @ts-ignore
    secret: process.env.SESSION_SECRET || config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true, // Ensure to not expose session cookies to clientside scripts
    },
  }),
);

// Handle logs in console during development
if (
  process.env.NODE_ENV === "development" ||
  config.NODE_ENV === "development"
) {
  app.use(morgan("dev"));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === "production" || config.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/api/passkey", passkeyRoutes);

if (!(process.env.ALLOW_REGISTER || config.ALLOW_REGISTER)) {
  app.get("/register", (req, res) => {
    console.log("Registering is disabled")
    res.status(404).redirect("/");
  });
}

app.use(express.static("src/public"));


export default app;
