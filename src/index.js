// Imports
const express = require("express");
const cors = require("cors");
const Db = require("./db/connection");

/*********************/
//   Initializations
/*********************/

const app = express();
const router = express();

/*********************/
//   Configuration
/*********************/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true }));
app.use(router);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () =>
  console.log(`App running on port ${app.get("port")}`)
);

/*********************/
//   Middleware
/*********************/

router.use((req, res, next) => {
  //to allow cross domain requests to send cookie information.
  res.header("Access-Control-Allow-Credentials", false);

  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header("Access-Control-Allow-Origin", req.headers.origin);

  // list of methods that are supported by the server
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN"
  );

  next();
});

/*********************/
//   API Routes
/*********************/

// Index
router.route("/").get((req, res) => {
  res.send({ connection: true });
});

// Admins
router.route("/administradores").get(async (req, res) => {
  Db.getAdmins().then((dat) => {
    console.log(dat.recordsets[0][0]);
    res.json({admins: dat.recordsets[0]});
  });
});

//Clients
router.route("/clientes").get(async (req, res) => {
  Db.getClients().then((dat) => {
    res.json(dat.recordsets);
  });
});

// Mob
router.route("/mobiliario").get(async (req, res) => {
  Db.getMobi().then((dat) => {
    res.json(dat.recordsets);
  });
});

// Mueb
router.route("/muebles").get(async (req, res) => {
  Db.getMueb().then((dat) => {
    res.json(dat.recordsets);
  });
});

// Peds
router.route("/pedidos").get(async (req, res) => {
  Db.getPed().then((dat) => {
    res.json(dat.recordsets);
  });
});

// Default
router.route("*").get(async (req, res) => {
  res.json({ result: "This page don't exists." });
});
