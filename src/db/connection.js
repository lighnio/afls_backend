const sql = require("mssql");
const config = require("./config");

// Administradores
const getAdmins = async () => {
  const pool = await sql.connect(config);
  const admins = pool.request()
  .execute('GetAdministradores')
  return admins;
};


// Clientes

const getClients = async () => {
  const pool = await sql.connect(config);
  const clients = pool.request()
  .execute('GetClientes');
  return clients;
};

const getClient = async (id) => {
  const pool = await sql.connect(config);
  const clients = pool.request()
  .input('IdCliente', sql.Int, id)
  .execute('GetCliente');
  return clients;
};

const insClient = async (cliente) => {
  const pool = await sql.connect(config);
  const client = pool.request()
  .input('Nombre', sql.VarChar(12), cliente.Nombre)
  .input('Apellido', sql.VarChar(15), cliente.Apellido)
  .input('NoTel', sql.VarChar(20), cliente.NoTel)
  .input('NoDpi', sql.VarChar(20), cliente.NoDpi)
  .execute('InsCliente');
  return client;
};

const delClient = async (id) => {
  const pool = await sql.connect(config);
  const client = pool.request()
  .input('IdCliente', sql.Int, id)
  .execute('DelCliente');
  return client;
};

const updClient = async (id, cliente) => {
  const pool = await sql.connect(config);
  const client = pool.request()
  .input("IdCliente", sql.Int, id)
  .input('Nombre', sql.VarChar(12), cliente.Nombre)
  .input('Apellido', sql.VarChar(15), cliente.Apellido)
  .input('NoTel', sql.VarChar(20), cliente.NoTel)
  .input('NoDpi', sql.VarChar(20), cliente.NoDpi)
  .execute('UpdCliente');
  return client;
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
  // Administradores
  getAdmins: getAdmins,

  // Clientes
  getClient: getClient,
  getClients: getClients,
  insClient: insClient,
  delClient: delClient,
  updClient: updClient,

  getMobi: getMobi,
  getMueb: getMueb,
  getPed: getPed,
};
