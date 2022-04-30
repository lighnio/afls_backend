const express = require('express');
var cors = require('cors');

/*********************/
//   Initializations
/*********************/

const app = express();
const router = express();

/*********************/
//   Configuration
/*********************/

app.use(express.urlencoded({    extended: true   }));
app.use(express.json());

app.use(cors({credentials: true}));
app.use(router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log(`App running on port ${app.get('port')}`));

/*********************/
//   Middleware
/*********************/

router.use((req, res, next) => {

    //to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', false);

    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);

    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    next();
})

/*********************/
//   API Routes
/*********************/

router.route('/clientes').get((req, res) => {
    res.json({clientes: [
        {'45879658214-9': {
            nombre: 'Alejandro',
            direccion: 'Bo. El Porvenir',
            referencias: 'Frente a la tienda de doña chonita'
        }}
    ]})
})

router.route('/inventario').get((req, res) => {
    res.json({clientes: [
        {'45879658214-9': {
            nombre: 'Alejandro',
            direccion: 'Bo. El Porvenir',
            referencias: 'Frente a la tienda de doña chonita'
        }}
    ]})
})