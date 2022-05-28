// Imports
const express = require("express");
const cors = require("cors");
const Db = require("./db/connection");
const { json } = require("express/lib/response");

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
    res.json({admins: dat.recordsets[0]});
  });
});

//Clientes
router.route("/clientes").get(async (req, res) => {
  Db.getClients().then((dat) => {
    res.json({clientes: dat.recordsets[0]});
  });
});

router.route("/clientes/:id").get(async (req, res) => {
  Db.getClient(req.params.id).then((dat) => {
    res.json({clientes: dat.recordsets[0]});
  });
});

router.route("/clientes/nuevo").post( async (req, res) => {
  Db.insClient(req.body).then(data => {
    res.status(201).json(data);
  }).catch(err => {console.log(err)})
});

router.route("/clientes/eliminar/:id").delete( async (req, res) => {
  Db.delClient(req.params.id).then(data => {
    res.status(200).json(data);
  }).catch(err => {console.log(err)})
});

router.route("/clientes/actualizar/:id").put( async (req, res) => {
  Db.updClient(req.params.id, req.body).then(data => {
    res.status(200).json(data);
  }).catch(err => {console.log(err)})
});


// Pedidos
router.route("/pedidos").get(async (req, res) => {
  Db.getPed().then((dat) => {
    res.json({"pedidos": dat.recordsets[0]});
  });
  });
  router.route("/pedidos/:id").get(async (req, res) => {
  Db.getPedido(req.params.id).then((dat) => {
    res.json(dat.recordsets[0][0]);
  }).catch(err => {console.log(err)});
});
router.route("/pedidos/actualizar/:id").put(async (req, res) => {
  Db.updPedido(req.params.id, req.body).then((dat) => {
    res.json(dat.recordsets);
  }).catch(err => {console.log(err)});
});
router.route("/pedidos/nuevo").post(async (req, res) => {
  Db.insPedido(req.body).then((dat) => {
    res.json(dat.recordsets);
  });
});
router.route("/pedidos/eliminar/:id").get(async (req, res) => {
  Db.getPed(req.params.id).then((dat) => {
    res.json(dat.recordsets);
  });
});


// Mob
router.route("/mobiliario").get(async (req, res) => {
  Db.getMobi().then((dat) => {
    res.json({mobiliario: dat.recordsets[0]});
  });
});
router.route("/mobiliario/:id").get(async (req, res) => {
  Db.getOneMobi(req.params.id).then((dat) => {
    res.json({mobiliario: dat.recordsets[0]});
  });
});
router.route("/mobiliario/actualizar/:id").put(async (req, res) => {
  Db.updMobi(req.params.id, req.body).then((dat) => {
    res.json(dat.recordsets);
  });
});
router.route("/mobiliario/nuevo").post(async (req, res) => {
  Db.insMobi(req.body).then((dat) => {
    res.json(dat.recordsets);
  });
});
router.route("/mobiliario/eliminar/:id").delete(async (req, res) => {
  Db.delMobi(req.params.id).then((dat) => {
    res.json(dat.recordsets);
  });
});


// Mueb
router.route("/inventario").get(async (req, res) => {
  Db.getInventario().then((dat) => {
    res.json({inventario: dat.recordsets[0]});
  });
});


// Get estado de cuenta
router.route("/estadocuenta").post(async (req, res) => {
  Db.getEstCu(req.body).then((dat) => {
    console.log(dat);
    res.json({estadocuenta: dat.recordset});
  }).catch(err => {console.log(err)});
});

// Default
router.route("*").get(async (req, res) => {
  res.json({ result: "Not recognized route." });
});
