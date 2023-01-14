// server for custom browser start page
const express = require("express");
const fs = require("fs");
const config = require("./config.json");
const client_config = require("./client/src/config.json");

const app = express();
const PORT = config.app.port;

app.use(express.static('client'));
app.set("views", "client/views");
app.set("view engine", "pug");
app.locals = {CONFIG: client_config};

// routes
app.get("/", (req, res) => {
  if (fs.existsSync("./client/views/main/" + client_config.layout + ".pug")){
    res.render("main/" + client_config.layout);
  }else{
    console.log("Layout does not exist, defaulting to Terminal");
    res.render("main/terminal");
  }
});

app.get("/config", (req, res) => {
  if (fs.existsSync("./client/views/settings/" + client_config.layout + ".pug")){
    res.render("settings/" + client_config.layout);
  } else {
    console.log("Layout does not exist, defaulting to Terminal");
    res.render("settings/terminal");
  }
});

// api
app.get("/api/client-configs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(config.client));
});

app.get("/api/configs", (req, res) => {
  let queries = req.url.split("?")[1].split("&");
  let key = queries[0].split("=")[1];
  let val = queries[1].split("=")[1];
  let confData = JSON.parse(fs.readFileSync("config.json").toString());
  if (Object.keys(confData).includes(key)){
    confData["client"][key] = val;
    fs.writeFileSync("config.json", JSON.stringify(confData, null, 2));
  } else {
    console.log("ERROR: property does not exist");
  }
  res.redirect("/config");
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
