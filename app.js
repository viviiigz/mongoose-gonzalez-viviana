import express from 'express';
import "dotenv/config";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

//levantar servidor
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})


