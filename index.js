const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");

Bugsnag.start({
  apiKey: "<YOUR-API-KEY>",
  plugins: [BugsnagPluginExpress],
});

const app = express();
const middleware = Bugsnag.getPlugin("express");

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(middleware.requestHandler);

app.get("/", (req, res) => {
  throw new Error("something went wrong");
});

app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
