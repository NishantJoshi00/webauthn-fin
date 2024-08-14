import app from "./server";
import config from "../config.json";
import fs from "fs";

import https from "https";

// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);

const key_name = process.env.CERT_NAME + ".key";
const cert_name = process.env.CERT_NAME + ".crt";

// const cert = {
//   key: fs.readFileSync(key_name),
//   cert: fs.readFileSync(cert_name),
// };

app.listen(port, () => {
  console.info("Express application started on port: " + port);
});
