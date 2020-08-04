const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const {config} = require('./config/index.js');

app.use(express.json());

//rutas
const casoExitoApi = require('./routes/casoExito.js');
const articulosApi = require('./routes/articulos.js');
const autorApi = require('./routes/autores.js');
const contactoApi = require('./routes/contacto.js');
const nosotrosApi = require('./routes/nosotros.js');
const serviciosApi = require('./routes/servicios.js');

//definicion de rutas
casoExitoApi(app);
articulosApi(app);
autorApi(app);
contactoApi(app);
nosotrosApi(app);
serviciosApi(app);

app.use('/public/img',express.static(`${__dirname}/public/img`));

app.listen(config.port,()=>{
    console.log(`listening http://localhost:${config.port}`);
})