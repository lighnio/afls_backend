const sql = require("mssql");
const config = require("./config");

const getAdmins = async () => {
  const pool = await sql.connect(config);
  const admins = pool.request().query("SELECT * FROM Administrador");
  return admins;
};

const getClients = async () => {
  const pool = await sql.connect(config);
  const clients = pool.request().query("SELECT * FROM Cliente");
  return clients;
};

const getMobi = async () => {
  const pool = await sql.connect(config);
  const mobi = pool.request().query("SELECT * FROM Mobilario");
  return mobi;
};

const getMueb = async () => {
  const pool = await sql.connect(config);
  const mueb = pool.request().query("SELECT * FROM Mueble");
  return mueb;
};

const getPed = async () => {
  const pool = await sql.connect(config);
  const pedido = pool.request().query("SELECT * FROM Pedido");
  return pedido;
};

module.exports = {
  getAdmins: getAdmins,
  getClients: getClients,
  getMobi: getMobi,
  getMueb: getMueb,
  getPed: getPed,
};
