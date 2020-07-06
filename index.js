const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const {config} = require('./config/index.js');

app.use(express.json());

//rutas
const casoExitoApi = require('./routes/casoExto.js');



//definicion de rutas
casoExitoApi(app);


app.listen(config.port,()=>{
    console.log(`listening http://localhost:${config.port}`);
})