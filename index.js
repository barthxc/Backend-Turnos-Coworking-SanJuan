import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import rutas from "./routes/routes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitios = [process.env.FRONTEND_URL]

const corsOptions = {
    origin:function(origin,callback){
        if(dominiosPermitios.indexOf(origin) !== -1){
            //El origen del Request está permisito
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }

}

app.use(cors(corsOptions));

app.use('/api',rutas);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
