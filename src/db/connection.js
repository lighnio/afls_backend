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
  .input('Nombre', sql.VarChar(12), cliente.Item1)
  .input('Apellido', sql.VarChar(15), cliente.Item2)
  .input('NoTel', sql.VarChar(20), cliente.Item3)
  .input('NoDpi', sql.VarChar(20), cliente.Item4)
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
  .input('Nombre', sql.VarChar(12), cliente.Item1)
  .input('Apellido', sql.VarChar(15), cliente.Item2)
  .input('NoTel', sql.VarChar(20), cliente.Item3)
  .input('NoDpi', sql.VarChar(20), cliente.Item4)
  .execute('UpdCliente');
  return client;
};


// Pedidos
const getPedidos = async () => {
  const pool = await sql.connect(config);
  const pedido = pool.request()
  .execute("GetPedidos");
  return pedido;
};

const getPedido = async (id) => {
  const pool = await sql.connect(config);
  const datapedido = pool.request()
  .input('IdPedido', sql.Int, id)
  .execute("GetPedido");
  return datapedido;
};

const updPedido = async (id, pedido) => {
  const pool = await sql.connect(config);
  console.log(id);
  console.log(pedido);
  // aux = pedido.Item3.slice(0, 10).split('/');
  // fecha_formateada = `${aux[2]}/${aux[1]}/${aux[0]}`;
  // console.log(pedido);
  // console.log(fecha_formateada);
  // const datapedido = pool.request()
  // .input('IdPedido', sql.Int, id)
  // .input('Descripcion', sql.VarChar, pedido.Item1)
  // .input('Direccion', sql.VarChar, pedido.Item2)
  // .input('FechaYHora', sql.DateTime, fecha_formateada)
  // .input('Estado', sql.Char, pedido.Item4)
  // .input('IdAdmin', sql.TinyInt, pedido.Item7 | 1)
  // .input('IdCliente', sql.Int, pedido.Item5)
  // .input('Precio', sql.Money, pedido.Item6)
  // .execute("UpdPedido");
  // return datapedido;
};

const insPedido = async (pedido) => {
  const pool = await sql.connect(config);
  const datapedido = pool.request()
  .input('Descripción', sql.VarChar, pedido.Item2)
  .input('Dirección', sql.VarChar, pedido.Item3)
  .input('FechaYHora', sql.DateTime, pedido.Item4)
  .input('Estado', sql.Char, pedido.Item6)
  .input('IdAdmin', sql.TinyInt, null)
  .input('IdCliente', sql.Int, pedido.Item1)
  .input('Precio', sql.Money, pedido.Item5)
  .execute("InsPedido");
  return datapedido;
};


const delPedido = async (id) => {
  const pool = await sql.connect(config);
  const pedido = pool.request()
  .input('IdPedido', sql.Int, id) 
  .execute("DelPedido");
  return pedido;
};


//Mobiliario
const getMobi = async () => {
  const pool = await sql.connect(config);
  const mobi = pool.request()
  .execute("GetMobiliario");
  return mobi;
};

const getOneMobi = async (id) => {
  const pool = await sql.connect(config);
  const mobi = pool.request()
  .input("IdMobiliario", sql.Int, id)
  .execute("GetOneMobiliario");
  return mobi;
};

const insMobi = async (mobiliario) => {
  const pool = await sql.connect(config);
  const mobi = pool.request()
  .input("Estado", sql.Char, mobiliario.Item1)
  .input("IdMueble", sql.Int, mobiliario.Item2)
  .input("IdPedido", sql.Int, mobiliario.Item3)
  .input("CantidadEnUso", sql.Int, mobiliario.Item4)
  .execute("InsMobiliario");
  return mobi;
};

const updMobi = async (id, mobiliario) => {
  const pool = await sql.connect(config);
  const mobi = pool.request()
  .input("IdMobiliario", sql.Int, id)
  .input("Estado", sql.Char, mobiliario.Item1)
  .input("IdMueble", sql.Int, mobiliario.Item2)
  .input("IdPedido", sql.Int, mobiliario.Item3)
  .input("CantidadEnUso", sql.Int, mobiliario.Item4)
  .execute("UpdMobiliario");
  return mobi;
};

const delMobi = async (id) => {
  const pool = await sql.connect(config);
  const mobi = pool.request()
  .input("IdMobiliario", sql.Int, id)
  .execute("DelMobiliario");
  return mobi;
};


// Muebles - INVENTARIO ACTUAL
const getInventario = async () => {
  const pool = await sql.connect(config);
  const inventario = pool.request()
  .query("GetInventario");
  return inventario;
};




// Estado de cuenta
const getEstCu = async (fechas) => {
  const pool = await sql.connect(config);
  console.log(fechas);
  const cuenta = pool.request()
  .input("Inicio", sql.DateTime, fechas.Item1)
  .input("Fin", sql.DateTime, fechas.Item2)
  .execute('GetEstadoCuenta');
  return cuenta;
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
  
  // Pedidos
  getPed: getPedidos,
  getPedido: getPedido,
  updPedido: updPedido,
  insPedido: insPedido,
  delPedido: delPedido,

  // Mobiliario
  getMobi: getMobi,
  getOneMobi: getOneMobi,
  updMobi: updMobi,
  insMobi: insMobi,
  delMobi: delMobi,

  // Inventario
  getInventario: getInventario,

  // Estado de Cuenta
  getEstCu: getEstCu
};
