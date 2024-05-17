const express = require('express');
const cors = require('cors');
const conectarDB = require('../config/db');
const app = express();

conectarDB();
//habilitar cors
//app.use(cors());
//aquí permitimos que se consulte desde el front de vercel
app.use(cors({
    origin: 'https://frontend-three-omega-60.vercel.app'
  }));
//habilitar json
app.use(express.json());

const PORT = process.env.PORT || 7000;

//llamamos las rutas
//http://localhost:4000/api/usuarios
app.use('/api/usuarios',require('../routes/Usuarios'));
//http://localhost:4000/api/auth
app.use('/api/auth',require('../routes/Auth'));

//http://localhost:4000/api/clientes
app.use('/api/clientes',require('../routes/Clientes'));

app.listen(PORT,(()=>{
    console.log('Conectado al servidor http://localhost:7000');
}))